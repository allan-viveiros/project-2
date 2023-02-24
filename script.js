import app from "./firebase";

//Import the sdk for the rtd product
//import the getDatabse and ref nnames export fromt the RTD module
import {
    getDatabase,
    ref
  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
  
  //Initailize our specific db using the configured app
  
  // Initialize Database content using the configured app
  const database = getDatabase(firebase);
  //Cretae a specific reference to the root of my db
  //This is the representation of our DB (this is how we hook into the DB and update and interact with it)
  const dbRef = ref(database);







// Pseudo Code

// Step 1 -> Create a landing page with the heading and title "Amazing Trip" and a <p> explain about the page.
// Step 2 -> create a form to receive the user inputs "name, email, Country visited, comments, avatar preset img" 
// Step 3 -> Create a div to receive the user's input
// Step 4 -> Add event listener for the form submit button, to get the inputs and shows on the proper div 
// Step 5 -> Declare a variable for each user's input.
