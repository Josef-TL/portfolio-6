const cafeList = document.querySelector("#cafe-list")
const userList = document.querySelector("#user-list")


// gets the search parameters https://www.sitepoint.com/get-url-parameters-with-javascript/
const queryString = window.location.search;


fetch("http://localhost:3000/cafes"+queryString)
    .then(response => response.json())
    .then(data => {
        data.forEach(e => {
            const newElement = document.createElement("li");
            newElement.innerText = e.cafe_name;
            cafeList.appendChild(newElement);
        });
    });

fetch("http://localhost:3000/users"+queryString)
    .then(response => response.json())
    .then(data => {
        data.forEach(e => {
            const newElement = document.createElement("li");
            newElement.innerText = e.user_name;
            userList.appendChild(newElement);
        });
    });


