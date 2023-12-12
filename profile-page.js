/*document.querySelector("#profilePhoto").addEventListener('change', function(event) {
    document.querySelector("#photoDisplayArea");

var file = event.target.files[0];

if (file) {
    var reader = new FileReader();
    reader.onload = function(e) {
        displayArea.style.backgroundImage = 'url(' + e.target.result + ')';
    }}})

// Assuming you have a user_id variable with the user's ID
*/

const uid ="JN1dwLD6RCbdTRxEmqxEa7NXx703"

fetch(`http://localhost:3000/favorits/`+ uid)
    .then((response) => response.json())
    .then((data) => {
        // Handle the list of favorite cafes returned from the API
        const favoritesList = document.querySelector(".favoritter ul");
        favoritesList.innerHTML = ""; // Clear the list first

        if (data.length > 0) {
            data.forEach((favorite) => {
                const favoriteItem = document.createElement("li");
                favoriteItem.textContent = favorite.cafe_name; // Adjust this based on your cafe data structure
                favoritesList.appendChild(favoriteItem);
            });
        } else {
            const noFavoritesItem = document.createElement("li");
            noFavoritesItem.textContent = "No favorite cafes yet.";
            favoritesList.appendChild(noFavoritesItem);
        }
    })
    .catch((error) => {
        console.error("Error fetching user's favorite cafes:", error);
    });