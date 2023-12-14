const cafeList = document.querySelector("#cafe-list")
const userList = document.querySelector("#user-list")
const submitButton = document.querySelector(".submit-button")

const dayArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

function createEmptyListElement() {
    const newElement = document.createElement("li");
    newElement.innerHTML = `<div> No Cafes found</div>`
    cafeList.appendChild(newElement)
}

function createCafeListElement(cafeObj){

    const newElement = document.createElement("li");
    newElement.classList.add("cafe-item");
    newElement.id = `cafe-element-${cafeObj.cafe_id}`
    newElement.dataset.cafeId = cafeObj.cafe_id;
    newElement.innerHTML =
        `<div class="cafe-item-name">
            ${cafeObj.cafe_name}
        </div>
        <div class="cafe-item-loc">
            ${cafeObj.location}
        </div>
        <div class="cafe-item-tag">Test</div>
        <div class="cafe-item-hours"></div> 
    <button class="add-to-favorites">Star</button>`
    cafeList.appendChild(newElement)

}
function createCafeHoursElement(hours){
    const newUl = document.createElement("ul")
    newUl.classList.add("hours-list")
    const liElement = document.querySelector(`#cafe-element-${hours[0].cafe_id} .cafe-item-hours`);
    newUl.innerHTML = `<h3>Opening Hours</h3>`
    const returnArray = [];

    hours.push(hours.shift());
    hours.forEach((e)=>{
        returnArray.push(dayArray[e.day]+" "+e.open_time.slice(0,2)+"-"+e.close_time.slice(0,2));
    });


    returnArray.forEach((e)=>{
        const newLi = document.createElement("li")
        newLi.classList.add("hours-list-item")
        newLi.innerText = e;
        newUl.appendChild(newLi)
    });

    liElement.appendChild(newUl)
}




const queryString = window.location.search;



// gets the search parameters https://www.sitepoint.com/get-url-parameters-with-javascript/
function fetchCafeData (){
    const queryString = window.location.search;
    fetch("http://localhost:3000/cafes/search"+queryString)
        .then(response => response.json())
        .then(data => {
            const key = 'cafe_id'
            const unique = [...new Map(data.map(item =>
                [item[key], item])).values()];

            if(unique.length !== 0){
                unique.forEach(e => {
                    const businessHours = data.filter((elem)=>elem.cafe_id === e.cafe_id);
                    createCafeListElement(e);
                    createCafeHoursElement(businessHours);
                });
            }
            else {
                createEmptyListElement()
            }
        });
}

fetchCafeData()

fetch("http://localhost:3000/users"+queryString)
    .then(response => response.json())
    .then(data => {
        data.forEach(e => {
            const newElement = document.createElement("li");
            newElement.innerText = e.user_name;
            userList.appendChild(newElement);
        });
    });

submitButton.addEventListener("click",()=>{
    fetchCafeData()
})


/*
if (addToFavoritesButtons) {
const user = auth.currentUser;
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
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
                            cafe_id: cafe_id,
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

    }
})
} else {
            // User is signed out
            console.log("test2");
        }
 */
