let roomChannel = null;
let currentRoom = null;

async function createRoom() {
  if (!session) return null;
  const category = document.getElementById('mpCategory').value;
  const difficulty = document.getElementById('mpDifficulty').value;
  const list = WORDS[category][difficulty];
  const entry = list[Math.floor(Math.random() * list.length)];
  const code = Math.random().toString(36).substring(2, 6).toUpperCase();

  const { data, error } = await supabase.from('game_rooms').insert({
    code,
    host_id: session.user.id,
    category,
    difficulty,
    word: entry.word.toUpperCase(),
    hint: entry.hint,
    vag_hint: entry.vagHint || '',
    max_guesses: MAX_GUESSES[difficulty],
    current_turn: session.user.id,
    status: 'waiting'
  }).select().single();

  if (error) return null;
  currentRoom = data;
  subscribeToRoom(data.id);
  return data;
}

async function joinRoom(code) {
  if (!session) return null;
  const { data, error } = await supabase
    .from('game_rooms')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('status', 'waiting')
    .single();

  if (error || !data) return null;
  if (data.host_id === session.user.id) return { error: 'Cannot join your own room' };

  const { data: updated } = await supabase
    .from('game_rooms')
    .update({ player2_id: session.user.id, status: 'playing' })
    .eq('id', data.id)
    .select()
    .single();

  currentRoom = updated;
  subscribeToRoom(data.id);
  return updated;
}

function subscribeToRoom(roomId) {
  if (roomChannel) supabase.removeChannel(roomChannel);

  roomChannel = supabase
    .channel('room-' + roomId)
    .on('postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'game_rooms', filter: `id=eq.${roomId}` },
      (payload) => {
        currentRoom = payload.new;
        renderMutliplayerUI();
      }
    )
    .subscribe();
}

function makeGuessMP(letter) {
  if (!currentRoom || currentRoom.status !== 'playing') return;
  if (currentRoom.current_turn !== session.user.id) return;

  const guessed = new Set(currentRoom.guessed_letters);
  if (guessed.has(letter)) return;

  const newGuessed = [...guessed, letter];
  let newWrong = currentRoom.wrong_guesses;
  let newStatus = 'playing';
  let winnerId = null;

  if (!currentRoom.word.includes(letter)) newWrong++;

  if ([...currentRoom.word].every(ch => newGuessed.includes(ch))) {
    newStatus = 'finished';
    winnerId = session.user.id;
  } else if (newWrong >= currentRoom.max_guesses) {
    newStatus = 'finished';
  }

  const nextTurn = session.user.id === currentRoom.host_id
    ? currentRoom.player2_id
    : currentRoom.host_id;

  supabase.from('game_rooms').update({
    guessed_letters: newGuessed,
    wrong_guesses: newWrong,
    status: newStatus,
    winner_id: winnerId,
    current_turn: nextTurn
  }).eq('id', currentRoom.id);
}

function renderMutliplayerUI() {
  if (!currentRoom) return;
  const isMyTurn = session && session.user.id === currentRoom.current_turn;

  const codeEl = document.getElementById('mpRoomCode');
  if (codeEl) codeEl.textContent = currentRoom.code;

  const statusEl = document.getElementById('mpStatus');
  if (statusEl) {
    if (currentRoom.status === 'waiting') statusEl.textContent = 'Waiting for opponent...';
    else if (currentRoom.status === 'playing') statusEl.textContent = isMyTurn ? 'Your turn!' : "Opponent's turn...";
    else statusEl.textContent = currentRoom.winner_id
      ? (currentRoom.winner_id === session.user.id ? 'You won!' : 'You lost!')
      : 'Game Over - word was: ' + currentRoom.word;
  }

  const guessed = new Set(currentRoom.guessed_letters);
  const word = currentRoom.word;

  const wordDisplayEl = document.getElementById('mpWordDisplay');
  if (wordDisplayEl) {
    wordDisplayEl.innerHTML = '';
    for (const ch of word) {
      const box = document.createElement('div');
      box.className = 'letter-box';
      if (guessed.has(ch) || currentRoom.status === 'finished') {
        box.textContent = ch;
        box.classList.add('revealed');
      }
      wordDisplayEl.appendChild(box);
    }
  }

  const mpKeyboardEl = document.getElementById('mpKeyboard');
  if (mpKeyboardEl) {
    mpKeyboardEl.innerHTML = '';
    for (let code = 65; code <= 90; code++) {
      const letter = String.fromCharCode(code);
      const btn = document.createElement('button');
      btn.className = 'key';
      btn.textContent = letter;
      if (guessed.has(letter)) {
        btn.disabled = true;
        btn.classList.add(word.includes(letter) ? 'correct' : 'wrong');
      } else if (!isMyTurn || currentRoom.status !== 'playing') {
        btn.disabled = true;
      }
      btn.addEventListener('click', () => makeGuessMP(letter));
      mpKeyboardEl.appendChild(btn);
    }
  }

  const wrongEl = document.getElementById('mpWrongLetters');
  if (wrongEl) {
    wrongEl.innerHTML = '';
    for (const letter of guessed) {
      if (!word.includes(letter)) {
        const span = document.createElement('span');
        span.className = 'wrong-letter';
        span.textContent = letter;
        wrongEl.appendChild(span);
      }
    }
  }

  const wc = document.getElementById('mpWrongCount');
  if (wc) wc.textContent = `Wrong: ${currentRoom.wrong_guesses}/${currentRoom.max_guesses}`;

  for (let i = 1; i <= 10; i++) {
    const el = document.getElementById('mpPart' + i);
    if (el) i <= currentRoom.wrong_guesses ? el.classList.add('visible') : el.classList.remove('visible');
  }

  const waitingDiv = document.getElementById('mpWaiting');
  const gameDiv = document.getElementById('mpGameArea');
  if (waitingDiv && gameDiv) {
    if (currentRoom.status === 'waiting') { waitingDiv.style.display = 'block'; gameDiv.style.display = 'none'; }
    else { waitingDiv.style.display = 'none'; gameDiv.style.display = 'block'; }
  }
}

function leaveRoom() {
  if (roomChannel) { supabase.removeChannel(roomChannel); roomChannel = null; }
  currentRoom = null;
  document.getElementById('mpLobby').style.display = 'block';
  document.getElementById('mpRoom').style.display = 'none';
}
