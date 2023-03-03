// PSEUDO CODE

//FIREBASE SETUP
// Step 1 -> Create a file (firebase.js) to configure and export the Firebase object.
// Step 2 -> Import the database object, and any required Firebase modules at the top of the main app file (app.js)

import app from "./firebase.js";
//Import the sdk for the rtd product
import {
  getDatabase,
  ref,
  onValue,
  push,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Initialize Database content using the configured app
const database = getDatabase(app);
//Cretae a specific reference to the root of my db
//This is the representation of our DB (this is how we hook into the DB and update and interact with it)
const dbRef = ref(database);
const dbUsers = ref(database, `/users`);

//JAVASCRIPT:

// Step 1 -> Use document.querySelector() to get all the JS objects:
// One that points to the UL where the user card will be displayed.
const ulElement = document.querySelector("ul");
// One that points to the text input where users will add his user name.
const userName = document.querySelector("#userName");
// One that points to the text input where users will add his email.
const userEmail = document.querySelector("#userEmail");
// One that points to the select input where users will add his choice of country.
const countries = document.querySelector("#countries");
// One that points to the text area  where users will add his comment.
const userComments = document.querySelector("#userComments");
// One that points to the form containing all those above data.
const form = document.querySelector("form");

// Step 3 -> Call onValue() to get a snapshot of the database, and to get a new snapshot any time the data changes/updates.
// Clear all content in the UL on the page, so that we can update it with the current list of user's cards.
onValue(dbRef, function (data) {
  if (data.exists()) {
    const userCard = data.val().users;
    //console.log(userCard)
    // clear the exisitng ul on the page
    ulElement.innerHTML = "";

    // Step 4 -> Loop through the users object.
    // For each new user in the database:
    for (let dataItem in userCard) {
      console.log(dataItem);

      // Create a new LI with:
      const newLi = document.createElement("li");
      // A div that contain the user avatar,a <h2> with the country selected, a <p> with the user name, another <p> with the user email and a last <p> with the user comment. Finally, we'll do a <p> to display date and hour of the comment.
      const divFlex = document.createElement("div");
      divFlex.className = "flexTop";

      const figure = document.createElement("figure");
      const image = document.createElement("img");
      image.src = "./assets/anonymous.png";
      image.alt = "User avatar";

      const figCaption = document.createElement("figcaption");
      figCaption.textContent = `${userCard[dataItem].name}`;

      const country = document.createElement("h2");
      country.textContent = `${userCard[dataItem].country}`;

      const dateTime = document.createElement("p");
      dateTime.className = "dateTime";
      dateTime.textContent = `${userCard[dataItem].dateTime}`;

      const comments = document.createElement("p");
      comments.className = "comment";
      comments.textContent = `${userCard[dataItem].comment}`;

      newLi.append(divFlex, dateTime, comments);
      divFlex.append(figure, country);
      figure.append(image, figCaption);

      // .append() the new LI into the UL on the page.
      ulElement.appendChild(newLi);
    }
  }
  //console.log(userCard[dataItem]);
});

form.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log(userName.value);
  if (userName.value.trim() && userComments.value.trim()) {
    let current = new Date();
    current = current.toString();
    let day = current.slice(8, 10);
    let month = current.slice(4, 7);
    let year = current.slice(11, 15);
    let hour = current.slice(16, 24);
    console.log(userName.value);
    const newPost = {
      avatar: "./assets/anonymous.png",
      comment: userComments.value,
      country: countries.value,
      dateTime: `${month} ${day}, ${year}, ${hour}`,
      email: userEmail.value,
      name: userName.value,
    };
    push(dbUsers,newPost);
  } else {
        alert("Please fill all required fields!")
}
    userName.value = "";
    userEmail.value = "";
    countries.value = "Australia";
    userComments.value = "";

});
// Step 5 -> Add event listener for the form submit button, to get the inputs and shows on the proper section
// Prevent the submit from causing the page to refresh
// Get what the user wrote in the all inputs.
