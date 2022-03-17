
document.addEventListener("DOMContentLoaded", function () {

    const db = firebase.firestore();
    const storage = firebase.storage();
    const auth = firebase.auth();
  
    function profileData() {
        auth.onAuthStateChanged((user) => {
            if (!user) return;
            setHeaderUserData();
            const uid = user.uid;
            console.log(user)
            var userData = db.collection("users").doc(`${uid}`);

            userData.get().then((udata) => {
                if (udata.exists) {
                    const userData = udata.data();
                    const fName = userData.firstName;
                    const lName = userData.lastName;
                    const email = userData.email;
                    const dName = fName + ` ` + lName;
                    const contact = userData.phoneNumber;
                    const photoURL = user.photoURL;
                    document.getElementById(`displayName`).innerText = `${dName}`;
                    document.getElementsByName('fName')[0].value = `${fName}`;
                    document.getElementsByName('lName')[0].value = `${lName}`;
                    document.getElementById('email').innerHTML = `${email}`;
                    document.getElementsByName('contact')[0].value = `${contact}`;
                    if (photoURL){
                        document.getElementById('profilePhoto').setAttribute(`src`, `${photoURL}`);
                    }
                }
                }).catch((error) => {
                    console.log("Error getting document:", error);
            });
        })
    }

    profileData();



    //Uploading new display photo
    const selectPhoto = document.getElementById("selectPhoto");
    const dpUploader = document.getElementById("dpUploader");
    
    
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
                    // description: "description",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    
                    })
                    .then(() => {
                        console.log("Document written");
                        selectPhoto.value = "";
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


    const updateProfile = document.getElementById("updateBtn");

    updateProfile.addEventListener("click", function () {
        
        const db = firebase.firestore();
        const auth = firebase.auth();
        auth.onAuthStateChanged((user) => {
                const uid = user.uid;
                // console.log(user)
                const fName = document.getElementById('fName').value;
                const lName = document.getElementById('lName').value;
                const contact = document.getElementById('contact').value;

                var userNow = db.collection("users").doc(`${uid}`);
                userNow.update({
                    firstName: `${fName}`,
                    lastName: `${lName}`,
                    phoneNumber: `${contact}`
                })
                .then(function() {
                    console.log("Document successfully written!" );
                    
                    profileData();
                    document.getElementById('fName').value = "";
                })
                .catch(function(error) {
                console.error( "Error writing document: " , error);
                })
                
            
        });
    });

    const changePassword = document.getElementById("pwdBtn");

    changePassword.addEventListener("click", function () {
        var user = firebase.auth().currentUser;
        const oldPass = document.getElementById("oldPass").value;
        const newPass = document.getElementById("newPass").value;
        const confirmPass = document.getElementById("confirmPass").value;
        // const credential = firebase.auth.EmailAuthProvider.credential(user.email,oldPass);
        // Reauthenticate
        // user.reauthenticateWithCredential(credential);
        user.signInWithEmailAndPassword('email', oldPass)

        if(newPass == confirmPass) {
            user.updatePassword(newPass);
            user.signInWithEmailAndPassword('email', newPass)
            alert("Password updated!")

        } else {
            console.log(`Not same!`)
        }
    });
});