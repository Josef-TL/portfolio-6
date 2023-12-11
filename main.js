const cafeList = document.querySelector("#cafe-list")
const userList = document.querySelector("#user-list")
const submitButton = document.querySelector(".submit-button")

const dayArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

function createCafeListElement(name,location,cost,noise,group,wifi,food,gluten,veg,pet){

    const newElement = document.createElement("li");
    newElement.classList.add("cafe-item")
    newElement.innerHTML = `<h3>${name}</h3><div class="cafe-wrap"><div class="cafe-main"><p>Location: ${location}</p>
    <p>Cost: ${cost}</p><p>Noise Level: ${noise}</p></div><div class="cafe-hours"></div></div>`
    cafeList.appendChild(newElement)
}
function createCafeHoursElement(hours){

    const newElement = document.createElement("li");
    newElement.classList.add("cafe-item")
    newElement.innerHTML = `<h3>${name}</h3><div class="cafe-wrap"><div class="cafe-main"><p>Location: ${location}</p>
    <p>Cost: ${cost}</p><p>Noise Level: ${noise}</p></div><div class="cafe-hours"></div></div>`
    cafeList.appendChild(newElement)
}


const queryString = window.location.search;

/*
function getBusinessHours (data){

    const countTemp = data.map(()=>data.)

    let returnArray = []

    for (let i = 0; i < data.length; i++) {

    }


    data.push(data.shift())
    data.forEach((e)=>{
        returnArray.push(dayArray[e.day]+" "+e.open_time.slice(0,2)+"-"+e.close_time.slice(0,2));
    });

    return returnArray;

}

 */

const addToFavoritesButtons = document.querySelectorAll(".add-to-favorites");


// gets the search parameters https://www.sitepoint.com/get-url-parameters-with-javascript/
function fetchCafeData (){
    const queryString = window.location.search;
    fetch("http://localhost:3000/cafes/search"+queryString)
    .then(response => response.json())
    .then(data => {
        data.forEach(e => {
            createCafeListElement(e.cafe_name,e.location,e.cost,e.noise,e.group,e.wifi,e.food,e.gluten,e.vegetarian,e.pet)
        });
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