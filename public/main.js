function sendNewCafe(name,type,city,cost,study) {

    const jsonObjectToPost = {
        cafe_name:name,
        type:type,
        city: city,
        cost: cost,
        study:study,
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

const submitButtonCafe = document.querySelector("#cafe-button");
const submitButtonUser = document.querySelector("#user-button")


submitButtonUser.addEventListener("click",()=>{
    const newUsername = document.querySelector("#user-name").value;
    const newUserFirstName = document.querySelector("#first-name").value;
    const newUserLastName = document.querySelector("#last-name").value;
    const newUserEmail = document.querySelector("#email").value;

    sendNewUser(newUsername,newUserFirstName,newUserLastName,newUserEmail);

});

submitButtonCafe.addEventListener("click",()=>{
    const newCafeName = document.querySelector("#cafe-name").value;
    const newCafeType = document.querySelector("#cafe-type").value;
    const newCafeCity = document.querySelector("#cafe-location").value;
    const newCafeCost = document.querySelector("#cafe-cost").value;
    const newCafeStudy = document.querySelector("#cafe-study").value;

    sendNewCafe(newCafeName,newCafeType,newCafeCity,newCafeCost,newCafeStudy);
});
