
// It's code from lesson, we can use async / await here
document.addEventListener("DOMContentLoaded", function () {

  const fileUpload = document.getElementById("fileUpload");
  const imgName = document.getElementById("imgName");
  const uploadBtn = document.getElementById("uploadBtn");

  const db = firebase.firestore();
  const storage = firebase.storage();

  let file = "";
  let fileName = "";
  let extension = "";

  fileUpload.addEventListener("change", function (e) {
    //console.log("e", e);
    file = e.target.files[0];
    fileName = file.name.split(".").shift();
    extension = file.name.split(".").pop();

    imgName.value = fileName;
  });

  uploadBtn.addEventListener("click", function () {
    if (imgName.value) {
      const id = db.collection("Images").doc().id;
      const storageRef = storage.ref(`images/${id}.${extension}`);
      const uploadTask = storageRef.put(file);
//
//       uploadTask.on(
//         "state_changed",
//         function (snapshot) {
//           let progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           uploader.value = progress;
//         },
//         function (error) {
//           console.log("Error:", error);
//         },
//         function () {
//           document.addEventListener("DOMContentLoaded", function () {
//             console.log("loaded");
//
//             const fileUpload = document.getElementById("fileUpload");
//             const imgName = document.getElementById("imgName");
//             const uploadBtn = document.getElementById("uploadBtn");
//             const gallery = document.getElementById("gallery");
//
//             const db = firebase.firestore();
//             const storage = firebase.storage();
//
//             let file = "";
//             let fileName = "";
//             let extension = "";
//
//             fileUpload.addEventListener("change", function (e) {
//               file = e.target.files[0];
//               fileName = file.name.split(".").shift();
//               extension = file.name.split(".").pop();
//
//               imgName.value = fileName;
//             });
//
//             submitBtn.addEventListener("click", function () {
//               if (imgName.value) {
//                 const id = db.collection("Images").doc().id;
//
//                 const storageRef = storage.ref(`images/${id}.${extension}`);
//
//                 const uploadTask = storageRef.put(file);
//
//                 uploadTask.on(
//                   "state_changed",
//                   function (snapshot) {
//                     let progress =
//                       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                     uploader.value = progress;
//                   },
//                   function (error) {
//                     console.log("Error:", error);
//                   },
//                   function () {
//                     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//                       db.collection("Images")
//                         .doc(id)
//                         .set({
//                           name: imgName.value,
//                           id,
//                           image: downloadURL,
//                           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//                         })
//                         .then(() => {
//                           console.log("Document written");
//                           file = "";
//                           fimeName = "";
//                           extension = "";
//                           imgName.value = "";
//                           uploader.value = 0;
//                         })
//                         .catch((err) => console.log("Error adding the document", err));
//                     });
//                   }
//                 );
//               }
//             });
//
//             function createGallery() {
//               const listRef = storage.ref("images");
//               listRef.listAll().then(function (res) {
//                 res.items.forEach(function (itemRef) {
//                   itemRef.getDownloadURL().then((downloadURL) => {
//                     const imgWrapper = document.createElement("div");
//                     imgWrapper.className = "img_wrapper";
//
//                     const img = document.createElement("img");
//                     img.src = downloadURL;
//
//                     imgWrapper.append(img);
//                     gallery.append(imgWrapper);
//                   });
//                 });
//               });
//             }
//
//             createGallery();
//           });
//           uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//             db.collection("Images")
//               .doc(id)
//               .set({
//                 name: imgName.value,
//                 id,
//                 image: downloadURL,
//                 timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//               })
//               .then(() => console.log("Document written"))
//               .catch((err) => console.log("Error adding the document", err));
//           });
//         }
//       );
//     }
//   });
});
