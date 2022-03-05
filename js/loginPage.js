document.getElementById('register-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const firstName = document.getElementById('register-firstName').value;
    const lastName = document.getElementById('register-lastName').value;
    const {auth, db} = getFirebaseModules();
    const userData = await auth.createUserWithEmailAndPassword(email, password);

    // todo form validation
    if (!firstName) throw new Error('no firstName');
    if (!lastName) throw new Error('no lastName');

    const uid = userData.user.uid;
    const user = {
      uid,
      firstName,
      lastName,
      email,
    }

    await db.collection("users").doc(uid).set(user);
  } catch (e){
    logError(e);
  }
});

document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const {auth} = getFirebaseModules();
    await auth.signInWithEmailAndPassword(email, password);
  } catch (e){
    logError(e);
  }
});
