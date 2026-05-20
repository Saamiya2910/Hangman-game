const Game = {
  word: '',
  hint: '',
  guessed: [],
  wrongCount: 0,
  hintUsed: false,
  isOver: false,

  reset() {
    this.word = '';
    this.hint = '';
    this.guessed = [];
    this.wrongCount = 0;
    this.hintUsed = false;
    this.isOver = false;
    document.getElementById('hintText').textContent = '';
    document.getElementById('hintBtn').disabled = false;
    document.getElementById('hintBtn').textContent = '💡 Need a hint?';
    document.getElementById('winModal').classList.remove('active');
    document.getElementById('loseModal').classList.remove('active');
    this.clearConfetti();

    const entry = WORDS[Math.floor(Math.random() * WORDS.length)];
    this.word = entry.word.toUpperCase();
    this.hint = entry.hint;

    this.render();
    this.renderKeyboard();
    this.updateWrongLetters();
    this.updateChances();
  },

  render() {
    const display = document.getElementById('wordDisplay');
    display.innerHTML = '';
    const letters = this.word.split('');
    let wordIdx = 0;
    for (let i = 0; i < letters.length; i++) {
      const ch = letters[i];
      if (ch === ' ') {
        const gap = document.createElement('span');
        gap.className = 'letter-box space';
        gap.textContent = '\u00A0';
        display.appendChild(gap);
        continue;
      }
      const box = document.createElement('span');
      box.className = 'letter-box';
      if (this.guessed.includes(ch) || this.isOver) {
        box.textContent = ch;
        box.classList.add('revealed');
        box.style.animationDelay = (wordIdx * 0.08) + 's';
      } else {
        box.textContent = '';
      }
      wordIdx++;
      display.appendChild(box);
    }
  },

  renderKeyboard() {
    const kb = document.getElementById('keyboard');
    kb.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const key = document.createElement('button');
      key.className = 'key';
      key.textContent = letter;
      key.dataset.letter = letter;

      if (this.guessed.includes(letter)) {
        key.disabled = true;
        if (this.word.includes(letter)) {
          key.classList.add('correct');
        } else {
          key.classList.add('wrong');
        }
      }

      key.addEventListener('click', () => this.guessLetter(letter));
      kb.appendChild(key);
    }
  },

  guessLetter(letter) {
    if (this.isOver || this.guessed.includes(letter)) return;
    this.guessed.push(letter);

    if (this.word.includes(letter)) {
      this.render();
      this.renderKeyboard();
      if (this.checkWin()) return;
    } else {
      this.wrongCount++;
      this.showBodyPart(this.wrongCount);
      this.updateWrongLetters();
      this.renderKeyboard();
      this.updateChances();
      if (this.checkLose()) return;
    }
  },

  showBodyPart(n) {
    const el = document.getElementById('part' + n);
    if (el) {
      el.classList.add('visible');
      el.style.animation = 'pop 0.4s ease';
    }
  },

  updateWrongLetters() {
    const container = document.getElementById('wrongLetters');
    container.innerHTML = '<span class="label">Wrong:</span>';
    const wrong = this.guessed.filter(l => !this.word.includes(l));
    wrong.forEach(l => {
      const span = document.createElement('span');
      span.className = 'wrong-letter';
      span.textContent = l;
      container.appendChild(span);
    });
  },

  updateChances() {
    document.getElementById('chancesCount').textContent = this.wrongCount;
  },

  checkWin() {
    const won = this.word.split('').every(ch => ch === ' ' || this.guessed.includes(ch));
    if (won) {
      this.isOver = true;
      this.showWin();
      return true;
    }
    return false;
  },

  checkLose() {
    if (this.wrongCount >= 8) {
      this.isOver = true;
      this.render();
      document.getElementById('loseWord').textContent = this.word;
      document.getElementById('loseModal').classList.add('active');
      return true;
    }
    return false;
  },

  showWin() {
    document.getElementById('winWord').textContent = this.word;
    document.getElementById('winModal').classList.add('active');
    this.spawnConfetti();
  },

  useHint() {
    if (this.hintUsed || this.isOver) return;
    this.hintUsed = true;
    const btn = document.getElementById('hintBtn');
    btn.disabled = true;
    btn.textContent = '💡 Hint used';
    document.getElementById('hintText').textContent = this.hint;
  },

  spawnConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#6c5ce7', '#e17055', '#00b894', '#fdcb6e', '#e84393', '#0984e3', '#fd79a8', '#00cec9'];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = (Math.random() * 8 + 5) + 'px';
      piece.style.height = (Math.random() * 8 + 5) + 'px';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
      piece.style.animationDelay = (Math.random() * 2) + 's';
      container.appendChild(piece);
    }
  },

  clearConfetti() {
    document.getElementById('confettiContainer').innerHTML = '';
  },

  handleKeydown(e) {
    if (this.isOver) return;
    const key = e.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) {
      this.guessLetter(key);
    } else if (e.key === 'Enter') {
      this.guessFullWord();
    }
  }
};
