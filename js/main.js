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
