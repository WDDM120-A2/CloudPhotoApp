document.addEventListener("DOMContentLoaded", function () {

    const db = firebase.firestore();
    const storage = firebase.storage();
    const auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
        setHeaderUserData();
        const uid = user.uid;
        var docRef = db.collection("users").doc(`${uid}`);

        docRef.get().then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                const fName = userData.firstName;
                const lName = userData.lastName;
                const email = userData.email;
                const dName = fName + ` ` + lName;
                const photoURL = user.photoURL;
                const contact = user.phoneNumber;
                console.log(user)
                document.getElementById(`displayName`).innerText = `${dName}`;
                document.getElementsByName('fName')[0].placeholder = `${fName}`;
                document.getElementsByName('lName')[0].placeholder = `${lName}`;
                document.getElementsByName('email')[0].placeholder = `${email}`;
                document.getElementsByName('contact')[0].placeholder = `${contact}`;
                document.getElementById('profilePhoto').setAttribute(`src`, `${photoURL}`);
            } 
            }).catch((error) => {
                console.log("Error getting document:", error);
        });
    })


    //Uploading new display photo
    const selectPhoto = document.getElementById("selectPhoto");
    const dpUploader = document.getElementById("dpUploader");
    const updateProfile = document.getElementById("updateBtn");
    
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
    
            uploadTask.on("state_changed", function () {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            user.updateProfile({photoURL: downloadURL})
            // Displaying uploaded photo
            document.getElementById('profilePhoto').setAttribute(`src`, `${downloadURL}`);
        
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
            }, function (error) {
              console.log("Error:", error);
            },
                      
            );
        }
    });
});
    
    updateProfile.addEventListener("click", function () {

            auth.onAuthStateChanged((user) => {
                if (user) {
                    updateUser();
                } else {
                    console.log(`User not logged in!`);
                }

                function updateUser() {
                    getAuth()
                        .updateUser(uid, {
                            email: 'modifiedUser@example.com',
                            phoneNumber: '+11234567890',
                            emailVerified: true,
                            password: 'newPassword',
                            displayName: 'Jane Doe',
                            photoURL: 'http://www.example.com/12345678/photo.png',
                            disabled: true,
                        })
                        .then((userRecord) => {
                            // See the UserRecord reference doc for the contents of userRecord.
                            console.log('Successfully updated user', userRecord.toJSON());
                        })
                        .catch((error) => {
                            console.log('Error updating user:', error);
                        });
                }
            
            // docRef.get().then((doc) => {
            //     if (doc.exists) {
            //         const userData = doc.data();
            //         const fName = document.getElementsByName('fName').value;
            //         const lName = document.getElementsByName('lName').value;
            //         const dName = fName + ` ` + lName;
            //         const email = document.getElementsByName('email').value;
            //         const contact = document.getElementsByName('contact').value;
            //         console.log(user)
            //         userData.firstName = fName;
            //         document.getElementById(`displayName`).innerText = `${dName}`;
            //         document.getElementsByName('fName')[0].placeholder = `${fName}`;
            //         document.getElementsByName('lName')[0].placeholder = `${lName}`;
            //         document.getElementsByName('email')[0].placeholder = `${email}`;
            //         document.getElementsByName('contact')[0].placeholder = `${contact}`;
            //     } 
            //     }).catch((error) => {
            //         console.log("Error getting document:", error);
            // });
        })
    })
});