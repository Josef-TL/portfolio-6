// Import the functions you need from the SDKs you need
/*
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

 */


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
submitButtonUser.addEventListener("click", (event) => {
    event.preventDefault();  // Prevent the default form submission

    const isFormValid = validateForm();  // Validate the form

    if (isFormValid) {
        // If the form is valid, proceed with user creation and data sending
        const newUsername = document.querySelector("#user-name").value;
        const password = document.querySelector("#password").value;
        const newUserFirstName = document.querySelector("#first-name").value;
        const newUserLastName = document.querySelector("#last-name").value;
        const newUserEmail = document.querySelector("#email").value;

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

