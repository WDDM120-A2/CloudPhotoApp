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

async function getUser(){
  const {db, auth} = getFirebaseModules();
  const doc = await db.collection("users").doc(`${auth.currentUser.uid}`).get();
  if(doc.exists){
    return doc.data();
  } else {
    return null;
  }
}

function initHandlers(){
  document.addEventListener("DOMContentLoaded", function () {
    const {auth} = getFirebaseModules();
    const galleryPath = '/gallery.html';

    auth.onAuthStateChanged((user) => {
      if (user) {
        const pathname = window.location.pathname;

        const galleryPath = window.location.host.includes('localhost') ? '/gallery.html' : '/PhotoGalleryApp/gallery.html';
        if (pathname !== galleryPath) {

          const currentPage = sessionStorage.getItem('currentPage');
          if (currentPage && currentPage === 'login'){
            window.location.pathname = galleryPath;
            return;
          }

          // set timeout to have enough time to save user before redirect during registration
          document.getElementById('loader').style.display = "flex";
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
}

async function logOut(){
  try {
    const {auth} = getFirebaseModules();
    await auth.signOut();
    window.location.pathname = '/';
  } catch (e){
    logError(e);
  }
}


async function setHeaderUserData () {
  try {
    const user = await getUser();
    console.log(user)
    const auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      if (!user) return;

      if (user.photoURL) {
        document.getElementById('headerUserImg').setAttribute(`src`, `${user.photoURL}`);
      }
    })

    if (user.phoneNumber){
      document.getElementById('headerPhoneNumber').textContent = user.phoneNumber;
    }

    if (user.displayName){
      document.getElementById('headerDisplayName').textContent = user.displayName;
    }

    if (user.firstName && user.lastName){
      document.getElementById('headerDisplayName').textContent = `${user.firstName} ${user.lastName}`;
    }
  } catch (err){
    console.log(err)
  }
}

