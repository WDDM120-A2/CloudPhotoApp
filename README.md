#Project
Web application inspired by Google photo album. This app uses Firebase and Bootstrap

#To start the project locally
npm install
npm start


#TODO
user registration (Olha)
store user in db during user registration (Olha)
forms validation
show somewhere in the header 'hello, user'
user login (Olha)
ability to save an image
save image and description in db
show saved images + description
folder for images?

----------------------------------------------------------------------------------
possible structure for user
{
 firstName: 'firstName',
 lastName: 'lastName',
 uid: 'uid'
}

possible structure for picture
{
    description: 'description',
    pictureUrl: 'pictureUrl',
    userUid: 'uid'
}

-----------------------------------------------------------------------------------
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
