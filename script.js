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



// PSEUDO CODE (test)

//FIREBASE SETUP
        // Step 1 -> Create a file (firebase.js) to configure and export the Firebase object.
        // Step 2 -> Import the database object, and any required Firebase modules at the top of the main app file (app.js)

//HTML document:
        // Step 1 -> Create a landing page with the heading and title "Amazing Trip" and a <p> explain about the page.
        // Step 2 -> create a form to receive the user inputs "name, email, Country visited, comments, avatar preset img" 
        // Step 3 -> Create a section to receive the user's input in a UL


//JAVASCRIPT:

        // Step 1 -> Use document.querySelector() to get all the JS objects:
             // One that points to the UL where the user card will be displayed.
             // One that points to the text input where users will add his user name.
             // One that points to the text input where users will add his email.
             // One that points to the select input where users will add his choice of country.
             // One that points to the text area  where users will add his comment.
             // One that points to the form containing all those above data.

        // Step 2 -> Call getDatabase() and ref() to create a reference to the Firebase database.

        // Step 3 -> Call onValue() to get a snapshot of the database, and to get a new snapshot any time the data changes/updates.
            // Clear all content in the UL on the page, so that we can update it with the current list of user's cards.

        // Step 4 -> Loop through the users object.
            // For each new user in the database:
                // Create a new LI with:
                // A div that contain the user avatar,a <h2> with the country selected, a <p> with the user name, another <p> with the user email and a last <p> with the user comment. Finally, we'll do a <p> to display date and hour of the comment.
                // .append() the new LI into the UL on the page.

        // Step 5 -> Add event listener for the form submit button, to get the inputs and shows on the proper section 
             // Prevent the submit from causing the page to refresh 
            // Get what the user wrote in the all inputs.
            // Use Firebase's get() function to get a snapshot of current list of user's card in the database.
             // Use Firebase's update() function to send the updated list of user's card to Firebase.

