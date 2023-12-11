/*
// Import the functions for firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import {onAuthStateChanged} from "firebase/auth";
 */
/*
Replace all your import lines to use the following pattern:
import { } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-SERVICE.js'
(where SERVICE is an SDK name such as firebase-firestore).
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js'


const firebaseConfig = {
    apiKey: "AIzaSyA00_9W4TP9UlVOxTcAi3AKT9HskTeNhn0",
    authDomain: "auth-for-projekt-6.firebaseapp.com",
    projectId: "auth-for-projekt-6",
    storageBucket: "auth-for-projekt-6.appspot.com",
    messagingSenderId: "183277618737",
    appId: "1:183277618737:web:f98fcddbae9bd6d11d7710",
    measurementId: "G-PSPZTHR0WY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Post new user to SQL server
function sendNewUser(uName,fName,lName,email) {

    const jsonObjectToPost = {
        uName:uName,
        fName:fName,
        lName:lName,
        email:email,
    }

    const fetchConfiguration = {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(jsonObjectToPost)
    }

    fetch("http://localhost:3000/users/new", fetchConfiguration)
        .then(res => res.json())
        .then(res => console.log(res));
}


const submitButtonUser = document.querySelector("#user-button");

function validateForm() {
    const emailInput = document.querySelector("#email");
    const emailError = document.querySelector("#emailError");
    const userInput = document.querySelector("#user-name");
    const userError = document.querySelector("#userError");
    const passwordInput = document.querySelector("#password");
    const passwordError = document.querySelector("#passwordError");

    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const userPattern = /^[A-Za-z]\w{2,14}$/;

    const email = emailInput.value;
    const username = userInput.value;
    const password = passwordInput.value;

    const minLength = 8;
    const hasNumber = /[0-9]/.test(password);

    let isValid = true;

    if (!emailPattern.test(email)) {
        emailError.textContent = "Email must be in a valid format";
        emailInput.classList.add('error');
        isValid = false;
    } else {
        emailError.textContent = "";
        emailInput.classList.remove('error');
    }

    if (!userPattern.test(username)) {
        userError.textContent = "Username must contain at least 3 characters";
        userInput.classList.add('error');
        isValid = false;
    } else {
        userError.textContent = "";
        userInput.classList.remove('error');
    }

    if (password.length < minLength || !hasNumber) {
        passwordError.textContent = "Password must contain at least 8 characters and 1 number";
        passwordInput.classList.add('error');
        isValid = false;
    } else {
        passwordError.textContent = "";
        passwordInput.classList.remove('error');
    }

    return isValid;
}

// Add an event listener to the submitButtonUser button
if(submitButtonUser){
submitButtonUser.addEventListener("click", (event) => {
    event.preventDefault();  // Prevent the default form submission

    const isFormValid = validateForm();  // Validate the form

    if (isFormValid) {
        // If the form is valid, proceed with user creation and data sending
        const newUsername = document.querySelector("#user-name").value;
        const newUserFirstName = document.querySelector("#first-name").value;
        const newUserLastName = document.querySelector("#last-name").value;
        const newUserEmail = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;


        createUserWithEmailAndPassword(auth, newUserEmail, password)
            .then((userCredential) => {
                // User creation successful
                const user = userCredential.user;
                sendNewUser(newUsername, newUserFirstName, newUserLastName, newUserEmail);
            })
            .catch((error) => {
                // Handle any error during user creation
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`Error ${errorCode}: ${errorMessage}`);
            });
    } else {
        // Form is not valid, do not proceed
        console.log("Form validation failed");
    }
});
}

// The user are sign-in to the webside
const loginButton = document.querySelector('.login-button')
if(loginButton){
loginButton.addEventListener('click', function logIn() {
    // Listen for changes in the user's authentication state
    const username = document.querySelector(".username").value;
    const password = document.querySelector(".password").value;
    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(true)

        }).then(()=>
        window.location.replace('index.html'))
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(false)
        });
});
}
//Sign user out from the user

const signOutButton = document.getElementById('signOutButton');

if(signOutButton){
signOutButton.addEventListener('click', function() {
    signOut(auth).then(() => {
        console.log("Signed out successfully.");
        //window.location.href ='/index.html'
    }).then(()=>
        window.location.replace('index.html'))
        .catch((error) => {
        console.error("Error signing out: ", error);
    });
});
}

const user = auth.currentUser;
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        let uid = user.uid;
        // ...
        // 👈 This is where you can also query the database as the user for the first time
       addToFavoritesButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const cafeId = event.target.parentElement.getAttribute("data-cafe-id");

                // Get the current user's UID
                const userId = user.uid;

                // Make a POST request to your API to add the cafe to the user's favorites
                fetch("http://localhost:3000/favorites", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: userId, // Use the user's UID
                        cafe_id: cafeId,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        // Handle success or error response
                        if (data.message === "Successful POST request") {
                            // Optionally, you can provide user feedback that the cafe was added to favorites
                            alert("Cafe added to favorites!");
                        } else {
                            alert("Failed to add cafe to favorites. Please try again.");
                        }
                    })
                    .catch((error) => {
                        console.error("Error adding cafe to favorites:", error);
                    });
            });
        });

        console.log(uid);
    } else {
        // User is signed out
        console.log("test2");
    }
});


