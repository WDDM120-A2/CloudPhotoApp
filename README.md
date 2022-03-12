#Project
Web application inspired by Google photo album. This app uses Firebase and Bootstrap

#To start the project locally
npm install
npm start

----------------------------------------------------------------------------------
structure for user
{
    firstName: 'firstName',
    lastName: 'lastName',
    uid: 'uid',
    displayName: 'displayName',
    photoURL: 'photoURL',
    phoneNumber: 'phoneNumber',
}

structure for picture
{
    description: 'description',
    pictureUrl: 'pictureUrl',
    userUid: 'uid'
}

-----------------------------------------------------------------------------------

#TODO

(Faye)
User UID was set to folder name to distinguish which image folder to take. We can expand this to like dropbox and create another folder for documents etc.
Next To Do:
1. Download
2. Share via email???
3. CSS (including user and picture structure)

-----------------------------------------------------------------------------------
(Elizabeth)
Can generate download link now. 
Image descriptions can now be saved in Firestore database (not sure if my understanding of this task is correct).
Added working delete button.

To Do:
CSS (I started a few fixes but not much, will continue today and tomorrow)
Folder for Images
Share via Email
