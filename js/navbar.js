const user = auth.currentUser;
let uid = "";

auth.onAuthStateChanged((user) => {
    const signUpLink = document.getElementById("signUpLink");
    const loginLink = document.getElementById("loginLink");
    const profileLink = document.getElementById("profileLink");
    const signOutButton = document.getElementById("signOutButton");

    if (user) {
        // User is signed in
        uid = user.uid;

        // Hide Sign Up and Login links
        signUpLink.style.display = "none";
        loginLink.style.display = "none";

        // Show Profile link and Sign Out button
        profileLink.style.display = "block";
        signOutButton.style.display = "block";
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