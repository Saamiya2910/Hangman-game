let session = null;

async function autoSignIn() {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    session = data.session;
    return;
  }
  const { data: anon } = await supabase.auth.signInAnonymously();
  session = anon.session;
}
