const cafeList = document.querySelector("#cafe-list")
const userList = document.querySelector("#user-list")
const submitButton = document.querySelector(".submit-button")


const dayArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

function createCafeListElement(cafeObj){

    const newElement = document.createElement("li");
    newElement.classList.add("cafe-item");
    newElement.id = `cafe-element-${cafeObj.cafe_id}`
    newElement.innerHTML =
        `<div class="cafe-item-name">
            ${cafeObj.cafe_name}
        </div>
        <div class="cafe-item-loc">
            ${cafeObj.location}
        </div>
        <div class="cafe-item-tag">Test</div>
        <div class="cafe-item-hours"></div>`
    cafeList.appendChild(newElement)
}

function createCafeHoursElement(hours){
    const newUl = document.createElement("ul")
    const liElement = document.querySelector(`#cafe-element-${hours[0].cafe_id} .cafe-item-hours`);

    const returnArray = [];

    hours.push(hours.shift());
    hours.forEach((e)=>{
        returnArray.push(dayArray[e.day]+" "+e.open_time.slice(0,2)+"-"+e.close_time.slice(0,2));
    });


    returnArray.forEach((e)=>{
        const newLi = document.createElement("li")
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
        dataStore = data;
        const key = 'cafe_id'
        const unique = [...new Map(data.map(item =>
            [item[key], item])).values()];


        unique.forEach(e => {

            const businessHours = data.filter((elem)=>elem.cafe_id === e.cafe_id);

            createCafeListElement(e);
            createCafeHoursElement(businessHours);


        });
    });

}

function getSearchValues(){
    let params = new URL(document.location).searchParams;

    return params;
}
let test = getSearchValues().get("cafename");
console.log(test)


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

createCafeHoursElement()


submitButton.addEventListener("click",()=>{
    fetchCafeData()
})