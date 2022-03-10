document.addEventListener("DOMContentLoaded", function () {

    // Show display photo if photoURL is existing
    firebase.auth().onAuthStateChanged((user) => {
        const id = db.collection("Images").doc().id;
        console.log(id.lastName)
        
        const fName = user.firstName;
        const lName = user.lastName;
        const email = user.email;
        const photoURL = user.photoURL;
        document.getElementById('profilePhoto').setAttribute(`src`, `${photoURL}`);
        document.getElementsByName('fName')[0].placeholder = `${fName}`;
        document.getElementsByName('lName')[0].placeholder = `${lName}`;
        document.getElementsByName('email')[0].placeholder = `${email}`;
        // console.log(user)
    });

    //Uploading new display photo

      const selectPhoto = document.getElementById("selectPhoto");
      const dpUploader = document.getElementById("dpUploader");
    
      const db = firebase.firestore();
      const storage = firebase.storage();

      selectPhoto.addEventListener("change", function (e) {
        file = e.target.files[0];
        fileName = file.name.split(".").shift();
        extension = file.name.split(".").pop();
      });
    
      dpUploader.addEventListener("click", function () {

        firebase.auth().onAuthStateChanged((user) => {
            const uid = user.uid;
    
        
        if (fileName) {
            const id = db.collection("Images").doc().id;
            const storageRef = storage.ref(`${uid}/profilePhoto/${uid}-dp.${extension}`);
            const uploadTask = storageRef.put(file);
    
          uploadTask.on("state_changed", function (snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressBar.value = progress;
            },
            function (error) {
              console.log("Error:", error);
            },
                      function () {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        user.updateProfile({photoURL: downloadURL})
                        document.getElementById('profilePhoto').setAttribute(`src`, `${user.photoURL}`);
                          db.collection("Images")
                            .doc(id)
                            .set({
                              name: fileName,
                              id: id,
                              image: downloadURL,
                              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                              
                            })
                            .then(() => {
                                console.log("Document written");
                                
                                console.log(user.photoURL);
                            })      
                            .catch((err) => console.log("Error adding the document", err));
                        });
                      }
                    );
                  }
                });
            });

    //Display Profile Picture   

    // function updatePhoto() {

    //         firebase.auth().onAuthStateChanged((user) => {
    //             const uid = user.uid;
    //             const storage = firebase.storage();
    //             storage.ref(`${uid}/profilePhoto/${uid}-dp.${extension}`).getDownloadURL()
    //             .then((url) => {
    //                 console.log(url)
    //                 document.getElementById('profilePhoto').setAttribute(`src`, `${url}`);
    //         })
    //     })
    // }
});