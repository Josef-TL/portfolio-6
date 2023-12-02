function sendNewCafe(id,name) {

    const jsonObjectToPost = {
        cafe_id:id,
        cafe_name:name
    }

    const fetchConfiguration = {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(jsonObjectToPost)
    }

    fetch("http://localhost:3000/new", fetchConfiguration)
        .then(res => res.json())
        .then(res => console.log(res));
}

function sendNewUser(id,name) {

    const jsonObjectToPost = {
        user_id:id,
        user_name:name
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

const submitButton = document.querySelector(".submit-button");


submitButton.addEventListener("click",()=>{

    const cafeID = document.querySelector("#new-cafe-id")
    const cafeName = document.querySelector("#new-cafe-name")
    const userID = document.querySelector("#new-user-id")
    const userName = document.querySelector("#new-user-name")

    sendNewCafe(cafeID,cafeName);
    sendNewUser(userID,userName)



});
