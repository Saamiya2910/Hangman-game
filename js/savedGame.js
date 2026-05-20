async function saveGame() {
  if (!session) return null;
  const { data, error } = await supabase.from('saved_games').insert({
    user_id: session.user.id,
    category: state.category,
    difficulty: state.difficulty,
    word: state.word,
    hint: state.hint,
    vag_hint: state.vagHint,
    guessed_letters: [...state.guessed],
    wrong_guesses: state.wrongGuesses,
    max_guesses: state.maxGuesses,
    hint_used: state.hintUsed
  }).select().single();
  if (error) return null;
  return data;
}

async function loadSavedGame(gameId) {
  const { data, error } = await supabase
    .from('saved_games')
    .select('*')
    .eq('id', gameId)
    .eq('user_id', session.user.id)
    .single();
  if (error || !data) return null;
  return data;
}

async function fetchSavedGames() {
  if (!session) return [];
  const { data, error } = await supabase
    .from('saved_games')
    .select('id, category, difficulty, wrong_guesses, max_guesses, created_at')
    .eq('user_id', session.user.id)
    .order('updated_at', { ascending: false });
  if (error) return [];
  return data;
}

async function deleteSavedGame(gameId) {
  await supabase.from('saved_games').delete().eq('id', gameId);
}

function resumeGame(saved) {
  state.category = saved.category;
  state.difficulty = saved.difficulty;
  state.word = saved.word;
  state.hint = saved.hint;
  state.vagHint = saved.vag_hint || '';
  state.guessed = new Set(saved.guessed_letters);
  state.wrongGuesses = saved.wrong_guesses;
  state.maxGuesses = saved.max_guesses;
  state.hintUsed = saved.hint_used;
  state.gameOver = false;

  const catName = state.category.charAt(0).toUpperCase() + state.category.slice(1);
  const diffName = state.difficulty.charAt(0).toUpperCase() + state.difficulty.slice(1);
  document.getElementById('categoryBadge').textContent = catName;
  document.getElementById('difficultyBadge').textContent = diffName;
  document.getElementById('wrongCount').textContent = `Wrong: ${state.wrongGuesses}/${state.maxGuesses}`;
  document.getElementById('hintText').textContent = '';
  const hintBtn = document.getElementById('hintBtn');
  if (state.difficulty === 'easy' || state.hintUsed) {
    hintBtn.style.display = 'none';
  } else if (state.difficulty === 'medium') {
    if (state.wrongGuesses < 4) {
      hintBtn.style.display = 'inline-block';
      hintBtn.disabled = true;
      hintBtn.style.opacity = '0';
      hintBtn.style.pointerEvents = 'none';
    } else {
      hintBtn.style.display = 'inline-block';
      hintBtn.style.opacity = '1';
      hintBtn.style.pointerEvents = 'auto';
      hintBtn.disabled = false;
    }
  } else {
    hintBtn.style.display = 'inline-block';
    hintBtn.style.opacity = '1';
    hintBtn.style.pointerEvents = 'auto';
    hintBtn.disabled = false;
  }
  document.getElementById('wrongLetters').innerHTML = '';
  for (const letter of state.guessed) {
    if (!state.word.includes(letter)) {
      const span = document.createElement('span');
      span.className = 'wrong-letter';
      span.textContent = letter;
      document.getElementById('wrongLetters').appendChild(span);
    }
  }
  for (let i = 1; i <= 10; i++) {
    const el = document.getElementById('part' + i);
    if (i <= state.wrongGuesses) el.classList.add('visible');
    else el.classList.remove('visible');
  }
  renderWord();
  renderKeyboard();
  showPage('gamePage');
}
