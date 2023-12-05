
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
    const newUserFirstName = document.querySelector("#first-name").value;
    const newUserLastName = document.querySelector("#last-name").value;
    const newUserEmail = document.querySelector("#email").value;

    sendNewUser(newUsername,newUserFirstName,newUserLastName,newUserEmail);

});