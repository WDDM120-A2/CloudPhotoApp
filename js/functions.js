function logError(error) {
  alert(error.message);
  console.log(error);
}

function getFirebaseModules(){
  const db = firebase.firestore();
  const storage = firebase.storage();
  const auth = firebase.auth();

  return {db, storage, auth };
}

function getUser(){
  const {auth} = getFirebaseModules();
  return auth.currentUser;
}

function initHandlers(){
  document.addEventListener("DOMContentLoaded", function () {
    const {auth} = getFirebaseModules();
    const galleryPath = '/gallery.html';

    auth.onAuthStateChanged((user) => {
      if (user) {
        const pathname = window.location.pathname;
        const galleryPath = '/gallery.html';
        if (pathname !== galleryPath) {
          // set timeout to have enough time to save user before redirect
          // todo separate register page
          setTimeout(() => {
            window.location.pathname = galleryPath;
          }, 2000)
        }
      } else {
        const pathname = window.location.pathname;
        if (pathname === galleryPath) {
          window.location.pathname = '/';
        }
      }
    });
  });

  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', async (event) => {
      try {
        const {auth} = getFirebaseModules();
        await auth.signOut();
      } catch (e){
        logError(e);
      }
    });
  }

  function setHeaderData (user) {

  }
}
