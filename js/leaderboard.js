async function submitScore(category, difficulty, word, wrongGuesses, won, hintUsed) {
  if (!session) return;
  const { error } = await supabase.from('scores').insert({
    user_id: session.user.id,
    category,
    difficulty,
    word,
    wrong_guesses: wrongGuesses,
    won,
    hint_used: hintUsed
  });
}

async function fetchLeaderboard() {
  const { data, error } = await supabase
    .from('scores')
    .select('*, user:user_id(email)')
    .eq('won', true)
    .order('wrong_guesses', { ascending: true })
    .limit(20);

  if (error) return [];
  return data.map((row, i) => ({
    email: row.user && row.user.email ? row.user.email.split('@')[0] : 'Player ' + (i + 1),
    category: row.category,
    difficulty: row.difficulty,
    word: row.word,
    wrongGuesses: row.wrong_guesses
  }));
}
