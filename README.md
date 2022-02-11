Created a Blog post web application wherein users can signup/log in using a valid email id. After which they can read/create blogs post.

## How to start a backend server (after cloning it on a local pc)

cd backend // go to the backend directory
create a file name as .env within that write "ID = mongodb+srv://prateek_bd:{password}@cluster0.onsao.mongodb.net/locofast"
password : prateek1234
npm install  // Install the dependencies
npm start //  run the command to start the server


## APIs

GET - http://localhost:9000/homepage  //  get all the blogs
 
GET - http://localhost:9000/homepage/:id/search/:key // get blog using filter 

GET - http://localhost:9000/homepage/:id/:blogid // get a particular blog 
 
GET - http://localhost:9000/edit/:id/:blogid // getting the data of blog to edit

POST - http://localhost:9000/  // create a user with {email, password} 

POST - http://localhost:9000/login // checking a user exist or not

POST - http://localhost:9000/create //create a blog with {title, author, content, userid}
 
PUT - http://localhost:9000/edit/:id/:blogid // edit the particular blog (only owner)
 
DELETE - http://localhost:9000/homepage/:id/:blogid // delete a particular blog (Owner or Admin)

## How to start a Frontned server (after cloning it on a local pc)

After cloning :

cd frontend // go to the frontend directory
npm install  // Install the dependencies
npm start //  run the command to start the server


