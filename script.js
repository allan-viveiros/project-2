// PSEUDO CODE

//FIREBASE SETUP
// Step 1 -> Create a file (firebase.js) to configure and export the Firebase object.>>> See firebase.js
// Step 2 -> Import the database object, and any required Firebase modules at the top of the main app file (app.js)

import app from "./firebase.js";
//Import the sdk for the rtd product
import {
  getDatabase,
  ref,
  onValue,
  push,
  update,
  get
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Initialize Database content using the configured app
const database = getDatabase(app);
//Create a specific reference to the root of my db
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

// Step 2 -> Call onValue() to get a snapshot of the database, and to get a new snapshot any time the data changes/updates.

onValue(dbRef, function (data) {
  if (data.exists()) {
    const userCard = data.val().users;

    // Clear all content in the UL on the page, so that we can update it with the current list of user's cards.
    ulElement.innerHTML = "";

    // Loop through the users object.
    // For each new user in the database:
    for (let cardItem in userCard) { 
      // console.log(userCard[cardItem]);
      fillCards(userCard[cardItem], cardItem);
    }
  }
  else {
    console.log("there is no cards to show!");
  }
});

function fillCards(cardsData, item) {
    // console.log(cardsData, item);       
    // Create a new LI with:
    const newLi = document.createElement("li");
    // Create a div that will contain the avatar, user name and country selected by the user. Giving this div a class
    const divFlex = document.createElement("div");
    divFlex.className = "flexTop";
    // Create a figure that will contain the avatar image.
    const figure = document.createElement("figure");
    // Create a image to display the avatar image.
    const image = document.createElement("img");
    image.src = "./assets/anonymous.png";
    image.alt = "User avatar";
    // Create a figcaption that will contain the username.
    const figCaption = document.createElement("figcaption");
    figCaption.textContent = `${cardsData.name}`;
    // Create a h2 that will contain the country name.
    const country = document.createElement("h2");
    country.textContent = `${cardsData.country}`;
    // Create a div that will contain the date/time and like button. Adding a class on this div
    const divFlexLike = document.createElement("div");
    divFlexLike.className = "divFlexLike";
    // Create a p that will contain the date and time .
    const dateTime = document.createElement("p");
    dateTime.className = "dateTime";
    dateTime.textContent = `${cardsData.dateTime}`;
    // Create a span that will contain the like button icon and counter.Adding it an id that we'll use for the click event. Update its inner html with the actual icon
    const likeButton = document.createElement("span");
    likeButton.id = `${item}`;
    likeButton.innerHTML = `<i class="fa fa-thumbs-up" aria-label="like button"></i> ${cardsData.like}`;
    // Create a p that will contain the comment .
    const comments = document.createElement("p");
    comments.className = "comment";
    comments.textContent = `${cardsData.comment}`;

    // Append divs and comment to the LI
    newLi.append(divFlex, divFlexLike, comments);
    //Append the figure and h2 to their parent div
    divFlex.append(figure, country);
    //Append the date/time and like to their parent div
    divFlexLike.append(dateTime, likeButton);
    // Append the user info to the figure
    figure.append(image, figCaption);
    // .append() the new LI into the UL on the page.
    ulElement.appendChild(newLi);   
}


// Step 3 -> Add event listener for the form submit button, to get the inputs and shows on the proper section
form.addEventListener("submit", function (event) {
  // Prevent the submit from causing the page to refresh
  event.preventDefault();
  // Get what the user wrote in the all inputs, if the input are not empty and a country is selected!
  if (
    userName.value.trim() &&
    userComments.value.trim() &&
    countries.value !== "none" &&
    userEmail.value.trim()
  ) {
    // Get the date time of the submit
    let current = new Date();
    current = current.toString();
    let day = current.slice(8, 10);
    let month = current.slice(4, 7);
    let year = current.slice(11, 15);
    let hour = current.slice(16, 24);
    // Create the new user object
    const newPost = {
      avatar: "./assets/anonymous.png",
      comment: userComments.value,
      country: countries.value,
      dateTime: `${month} ${day}, ${year}, ${hour}`,
      email: userEmail.value,
      name: userName.value,
      like: 0,
    };
    // Push the new user object to the database
    push(dbUsers, newPost)
    .catch((error) => {
      console.log(`Error: ${error}`);
    });

    // Reset every input after the submission
    userName.value = "";
    userEmail.value = "";
    countries.value = "none";
    userComments.value = "";

    // Display a message to the user if one of the input are not filled correctly
  } else if (!userName.value.trim()) {
    alert("Please provide your user name!");
  } else if (!userEmail.value.trim()) {
    alert("Please provide your email address!");
  } else if (countries.value === "none") {
    alert("Please select a country !");
  } else if (!userComments.value.trim()) {
    alert("Please provide a comment !");
  }
});

// Step 4 -> Add event listener for the UL element (targeting the like button), to increase the number of like of the comment
ulElement.addEventListener("click", function (e) {
  // Checking if the click happen on the button
  if (e.target.tagName === "I") {
    //Creating a variable that use the id of the span (we created it in the onValue). We need it to identify which like button we need to update
    const key = e.target.parentElement.id;
    // Creating a variable that will transform into a number the inner text of the span (Inner text contain the number of like)
    let counter = parseInt(e.target.parentElement.innerText);
    // Adding one
    counter += 1;
    // Creating a new object that will update the like key in our database
    const newLike = {
      like: counter,
    };
    // Creating a variable for a new ref that will target the correct object
    const updateRef = ref(database, `/users/${key}`);
    // Updating the "like" value for this object
    update(updateRef, newLike);
  }
});


const buttonSearch = document.querySelector("#search");
const buttonClear = document.querySelector("#clear");

buttonSearch.addEventListener("click", function() {
  const searchCountry = document.querySelector("#searchCountry").value;

  const getCountry = ref(database, `/users`);
  get(getCountry)
  .then(snapshot => {  
    const data = snapshot.val();
    let count = 0;

    ulElement.innerHTML = "";    

    for(let item in data) {      
      if(data[item].country === searchCountry) {
        count += 1;
        fillCards(data[item], item);
      }
    }

    if(count === 0) {
      alert(`There is no cards to show for ${searchCountry}`);
      location.reload();
    }
   
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
});

buttonClear.addEventListener("click", function() {
  location.reload();
});


