
// It's code from lesson, we can use async / await here
document.addEventListener("DOMContentLoaded", function () {

        firebase.auth().onAuthStateChanged((user) => {
            const uid = user.uid;
            console.log(uid);
            setHeaderUserData();
          });
  
  
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
    document.getElementById(`setFileName`).style = "display: flex"
  });

  uploadBtn.addEventListener("click", function () {

    firebase.auth().onAuthStateChanged((user) => {
        const uid = user.uid;

    
    if (imgName.value) {
      const id = db.collection("Images").doc().id;
      const storageRef = storage.ref(`${uid}/images/${id}.${extension}`);
      console.log(uid);
      const uploadTask = storageRef.put(file);

      uploadTask.on("state_changed", function (snapshot) {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progressBar.value = progress;
          progressBar.style = `display: block`;
        },
        function (error) {
          console.log("Error:", error);
        },
                  function () {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                      db.collection("Images")
                        .doc(id)
                        .set({
                          name: imgName.value,
                          id: id,
                          image: downloadURL,
                          description: "",
                          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        })
                        .then(() => {
                          console.log("Document written");
                          file = "";
                          fileName = "";
                          extension = "";
                          imgName.value = "";
                          progressBar.value = 0;
                          
                          createGallery();
                        })
                        .catch((err) => console.log("Error adding the document", err));
                    });
                  }
                );
              }
            });
            
        });

            function createGallery() {
              progressBar.style = `display: none`;
              document.getElementById(`setFileName`).style = "display: none"
                firebase.auth().onAuthStateChanged((user) => {
                    const uid = user.uid;
                    console.log(uid)
                const clearGallery = document.getElementById("gallery");  
                clearGallery.innerHTML = "";
                  
                const listRef = storage.ref(`${uid}/images`);
                listRef.listAll().then(function (res) {
                    res.items.forEach(function (itemRef) {
                    itemRef.getDownloadURL().then((downloadURL) => {
                        
                      //Downloading Image
                        db.collection("Images")
                        .doc(uid)
                        .set({
                          name: imgName.value,
                          id: uid,
                          image: downloadURL,
                          description: "",
                          timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        })
                        .then(()=>console.log(downloadURL))
                        .catch((err)=> console.log("Error in adding document", err));

                    
                        const imgWrapper = document.createElement("div");
                        imgWrapper.className = "img_wrapper";

                        const img = document.createElement("img");
                        img.className = "uploadedImage";
                        img.src = downloadURL;

                        //Delete an image
                        const deleteBtn = document.createElement("span");

                        deleteBtn.innerHTML= `<img class="delete-icon" src="./img/delete-icon.svg">` ;

                        deleteBtn.addEventListener("click", function(){
                          itemRef
                          .delete()
                          .then(function() {
                            db.collection("Images").doc(itemRef.name.split(".").shift()).delete().then(function(){
                              console.log(`Successfully deleted image`);
                              createGallery();
                            })

                          })
                          .catch((err) => console.log("Error in deleting image"), err);

                        });

                        imgWrapper.append(img);
                        imgWrapper.append(deleteBtn);
                        gallery.append(imgWrapper);



                  });
                });
              });
            });

        }

            createGallery();


});
            
