// Import the functions you need from the SDKs you need
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

submitButtonUser.addEventListener("click",()=>{
    const newUsername = document.querySelector("#user-name").value;
    const password = document.querySelector("#password").value;
    const newUserFirstName = document.querySelector("#first-name").value;
    const newUserLastName = document.querySelector("#last-name").value;
    const newUserEmail = document.querySelector("#email").value;

    createUserWithEmailAndPassword(auth, newUserEmail, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

    sendNewUser(newUsername,newUserFirstName,newUserLastName,newUserEmail);
});


