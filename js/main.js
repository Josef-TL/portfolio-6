const cafeList = document.querySelector("#cafe-list")
const userList = document.querySelector("#user-list")
const submitButton = document.querySelector(".submit-button")

const dayArray = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

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
function createCafeHoursElement(hoursData){
    const newUl = document.createElement("ul")
    newUl.classList.add("hours-list")
    const liElement = document.querySelector(`#cafe-element-${hoursData.cafe_id} .cafe-item-hours`);
    newUl.innerHTML = `<h3>Opening Hours</h3>`
    const returnArray = [];

    dayArray.forEach((e)=>{
        returnArray.push(e + " " + hoursData.open_time.slice(0,2) + "-" + hoursData.close_time.slice(0,2))
    })



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
            if(data.length !== 0){
                data.forEach(e => {

                    createCafeListElement(e);
                    createCafeHoursElement(e);
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
