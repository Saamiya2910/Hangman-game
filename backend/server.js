const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// ── In-memory rooms ──
const rooms = {};

function genCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code;
  do {
    code = '';
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  } while (rooms[code]);
  return code;
}

function getRoomBySocket(socketId) {
  for (const code in rooms) {
    const room = rooms[code];
    if (room.players.find(p => p.id === socketId)) return room;
  }
  return null;
}

function broadcast(room) {
  const payload = {
    code: room.code,
    players: room.players.map(p => ({
      nick: p.nick,
      score: p.score,
      isHost: p.isHost,
      isWordMaster: p.isWordMaster,
      connected: p.connected
    })),
    status: room.status,
    round: room.round,
    maxRounds: room.maxRounds,
    wordDisplay: room.wordDisplay || null,
    guessedLetters: room.guessedLetters || [],
    wrongGuesses: room.wrongGuesses || 0,
    maxWrong: room.maxWrong,
    scores: room.players.map(p => ({ nick: p.nick, score: p.score })),
    winner: room.winner || null,
    wordMasterNick: room.players[room.wordMasterIndex]?.nick || null
  };

  // Don't send the word to guessers
  for (const p of room.players) {
    const socket = io.sockets.sockets.get(p.id);
    if (!socket) continue;
    const isWordMaster = p.isWordMaster;
    socket.emit('room_update', {
      ...payload,
      isWordMaster,
      secretWord: isWordMaster ? room.word : null
    });
  }
}

// ── Socket events ──
io.on('connection', (socket) => {
  console.log('Connected:', socket.id);

  socket.on('create_room', ({ nickname }, cb) => {
    if (!nickname || nickname.trim().length < 1) {
      return cb({ error: 'Enter a nickname' });
    }
    const nick = nickname.trim().slice(0, 15);
    const code = genCode();
    rooms[code] = {
      code,
      players: [{
        id: socket.id,
        nick,
        score: 0,
        isHost: true,
        isWordMaster: false,
        connected: true
      }],
      status: 'waiting',
      round: 0,
      maxRounds: 3,
      wordMasterIndex: 0,
      word: '',
      guessedLetters: [],
      wrongGuesses: 0,
      maxWrong: 8,
      winner: null
    };
    socket.join(code);
    cb({ ok: true, code });
    broadcast(rooms[code]);
  });

  socket.on('join_room', ({ code, nickname }, cb) => {
    if (!nickname || nickname.trim().length < 1) {
      return cb({ error: 'Enter a nickname' });
    }
    const nick = nickname.trim().slice(0, 15);
    const c = code.toUpperCase();
    const room = rooms[c];
    if (!room) return cb({ error: 'Room not found' });
    if (room.status !== 'waiting') return cb({ error: 'Game already started' });
    if (room.players.length >= 5) return cb({ error: 'Room is full (max 5)' });
    if (room.players.find(p => p.nick.toLowerCase() === nick.toLowerCase())) {
      return cb({ error: 'Nickname taken' });
    }
    room.players.push({
      id: socket.id,
      nick,
      score: 0,
      isHost: false,
      isWordMaster: false,
      connected: true
    });
    socket.join(c);
    cb({ ok: true, code: c });
    broadcast(room);
  });

  socket.on('start_game', () => {
    const room = getRoomBySocket(socket.id);
    if (!room) return;
    const player = room.players.find(p => p.id === socket.id);
    if (!player || !player.isHost) return;
    if (room.players.filter(p => p.connected).length < 2) return;

    room.status = 'playing';
    room.round = 0;
    startRound(room);
    broadcast(room);
  });

  function startRound(room) {
    room.round++;
    room.word = '';
    room.guessedLetters = [];
    room.wrongGuesses = 0;
    room.wordDisplay = null;
    room.winner = null;

    const wmIdx = (room.round - 1) % room.players.length;
    room.wordMasterIndex = wmIdx;
    room.players.forEach((p, i) => {
      p.isWordMaster = i === wmIdx;
    });
    broadcast(room);
  }

  socket.on('submit_word', ({ word }, cb) => {
    const room = getRoomBySocket(socket.id);
    if (!room) return cb?.({ error: 'Not in a room' });
    const player = room.players.find(p => p.id === socket.id);
    if (!player || !player.isWordMaster) return cb?.({ error: 'Not your turn' });
    if (!word || word.trim().length < 2 || word.trim().length > 12) {
      return cb?.({ error: 'Word must be 2-12 letters' });
    }
    const clean = word.trim().toUpperCase();
    if (!/^[A-Z]+$/.test(clean)) return cb?.({ error: 'Letters only' });

    room.word = clean;
    room.guessedLetters = [];
    room.wrongGuesses = 0;
    room.winner = null;
    room.wordDisplay = clean.split('').map(() => '_').join('');

    // Remove word master status (they don't play this round)
    player.isWordMaster = true;

    broadcast(room);
    cb?.({ ok: true });
  });

  socket.on('make_guess', ({ guess }, cb) => {
    const room = getRoomBySocket(socket.id);
    if (!room) return cb?.({ error: 'Not in a room' });
    const player = room.players.find(p => p.id === socket.id);
    if (!player) return;
    if (player.isWordMaster) return cb?.({ error: "You're the Word Master" });
    if (room.status !== 'playing') return cb?.({ error: 'Not playing' });
    if (!room.word) return cb?.({ error: 'No word set yet' });
    if (room.winner) return cb?.({ error: 'Round already ended' });
    if (room.wrongGuesses >= room.maxWrong) return cb?.({ error: 'No guesses left' });

    const g = guess.toUpperCase().trim();
    if (!g) return cb?.({ error: 'Empty guess' });
    if (room.guessedLetters.includes(g)) return cb?.({ error: 'Already guessed' });

    // Full word guess
    if (g.length > 1) {
      if (g === room.word) {
        player.score = (player.score || 0) + 1;
        room.winner = player.nick;
        room.status = 'roundEnd';
        broadcast(room);
        return cb?.({ ok: true, result: 'word_correct' });
      } else {
        return cb?.({ ok: true, result: 'word_wrong' });
      }
    }

    // Letter guess
    if (!/^[A-Z]$/.test(g)) return cb?.({ error: 'Guess a letter A-Z' });
    room.guessedLetters.push(g);

    if (room.word.includes(g)) {
      room.wordDisplay = room.word.split('').map(ch =>
        room.guessedLetters.includes(ch) ? ch : '_'
      ).join('');

      // Check if fully revealed
      if (!room.wordDisplay.includes('_')) {
        // The player who guessed the last letter gets the point
        player.score = (player.score || 0) + 1;
        room.winner = player.nick;
        room.status = 'roundEnd';
      }
    } else {
      room.wrongGuesses++;
      if (room.wrongGuesses >= room.maxWrong) {
        room.status = 'roundEnd';
        room.winner = null; // no one won
      }
    }

    broadcast(room);
    cb?.({ ok: true });
  });

  socket.on('next_round', () => {
    const room = getRoomBySocket(socket.id);
    if (!room || room.status !== 'roundEnd') return;
    if (room.round >= room.maxRounds) {
      room.status = 'gameOver';
      const sorted = [...room.players].sort((a, b) => b.score - a.score);
      room.winner = sorted[0].nick;
      broadcast(room);
      return;
    }
    startRound(room);
    broadcast(room);
  });

  socket.on('play_again', () => {
    const room = getRoomBySocket(socket.id);
    if (!room) return;
    room.players.forEach(p => { p.score = 0; p.isWordMaster = false; });
    room.status = 'waiting';
    room.round = 0;
    room.word = '';
    room.guessedLetters = [];
    room.wrongGuesses = 0;
    room.wordDisplay = null;
    room.winner = null;
    room.wordMasterIndex = 0;
    broadcast(room);
  });

  function removePlayer(room, socketId) {
    const idx = room.players.findIndex(p => p.id === socketId);
    if (idx === -1) return false;
    const wasHost = room.players[idx].isHost;
    const wasWM = room.players[idx].isWordMaster;

    if (room.status === 'waiting') {
      room.players.splice(idx, 1);
    } else {
      room.players[idx].connected = false;
    }

    // Reassign host if needed
    if (wasHost) {
      const next = room.players.find(p => p.connected);
      if (next) next.isHost = true;
    }

    // If word master disconnected mid-game, end round
    if (room.status === 'playing' && wasWM) {
      room.status = 'roundEnd';
      room.winner = null;
    }

    if (room.players.filter(p => p.connected).length === 0) {
      delete rooms[room.code];
      return false;
    }
    return true;
  }

  socket.on('leave_room', () => {
    const room = getRoomBySocket(socket.id);
    if (!room) return;
    removePlayer(room, socket.id);
    socket.leave(room.code);
    if (rooms[room.code]) broadcast(room);
  });

  socket.on('disconnect', () => {
    const room = getRoomBySocket(socket.id);
    if (!room) return;
    removePlayer(room, socket.id);
    if (rooms[room.code]) broadcast(room);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Hangman party server on port ${PORT}`);
});
