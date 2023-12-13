import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


const user = auth.currentUser;

let uid = ""
auth.onAuthStateChanged((user) => {
    const signUpLink = document.getElementById("signUpLink");
    const loginLink = document.getElementById("loginLink");
    const profileLink = document.getElementById("profileLink");
    const signOutButton = document.getElementById("signOutButton");
    const submitButtonCafe = document.querySelector("#cafe-button");

    if (user) {
        // User is signed in
        uid = user.uid;

        // Hide Sign Up and Login links
        signUpLink.style.display = "none";
        loginLink.style.display = "none";

        // Show Profile link and Sign Out button
        profileLink.style.display = "block";
        signOutButton.style.display = "block";

        submitButtonCafe.addEventListener("click",()=>{
            const userLog = uid
            const newCafeName = document.querySelector("#cafe-name").value;
            const newCafeLocation = document.querySelector("#cafe-location").value;
            const newCafeCost = document.querySelector("#cafe-cost").value;
            const newCafeNoise = document.querySelector("#cafe-noise").value;
            const newCafeGroup = document.querySelector("#cafe-group").checked;
            const newCafeWifi = document.querySelector("#cafe-wifi").checked;
            const newCafeFood = document.querySelector("#cafe-food").checked;
            const newCafeGluten = document.querySelector("#cafe-gluten").checked;
            const newCafeVeg = document.querySelector("#cafe-veg").checked;
            const newCafePet = document.querySelector("#cafe-pets").checked;

            sendNewCafe(userLog,newCafeName,newCafeLocation,newCafeCost,newCafeNoise, newCafeGroup,newCafeWifi,newCafeFood,newCafeGluten,newCafeVeg,newCafePet);
        });


    } else {
        // User is signed out
        uid = 0;

        // Show Sign Up and Login links
        signUpLink.style.display = "block";
        loginLink.style.display = "block";

        // Hide Profile link and Sign Out button
        profileLink.style.display = "none";
        signOutButton.style.display = "none";
    }

});

function sendNewCafe(name,location,cost,noise,group,wifi,food,gluten,veg,pet) {

    const jsonObjectToPost = {
        cafe_name:name,
        user_id:userId,
        location:location,
        cost: cost,
        wifi:wifi,
        noise:noise,
        food: food,
        group: group,
        gluten: gluten,
        veg:veg,
        pet:pet,
    }

    const fetchConfiguration = {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(jsonObjectToPost)
    }

    fetch("http://localhost:3000/cafes/new", fetchConfiguration)
        .then(res => res.json())
        .then(res => console.log(res));
}