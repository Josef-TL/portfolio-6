function sendNewCafe(name,location,cost,noise,group,wifi,food,gluten,veg,pet) {

    const jsonObjectToPost = {
        cafe_name:name,
        location:location,
        cost: cost,
        wifi:wifi,
        noise:noise,
        food: food,
        group: group,
        gluten: gluten,
        veg:veg,
        pet:pet,
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

const submitButtonCafe = document.querySelector("#cafe-button");


submitButtonCafe.addEventListener("click",()=>{
    const newCafeName = document.querySelector("#cafe-name").value;
    const newCafeLocation = document.querySelector("#cafe-location").value;
    const newCafeCost = document.querySelector("#cafe-cost").value;
    const newCafeNoise = document.querySelector("#cafe-noise").value;
    const newCafeGroup = document.querySelector("#cafe-group").checked;
    const newCafeWifi = document.querySelector("#cafe-wifi").checked;
    const newCafeFood = document.querySelector("#cafe-food").checked;
    const newCafeGluten = document.querySelector("#cafe-gluten").checked;
    const newCafeVeg = document.querySelector("#cafe-veg").checked;
    const newCafePet = document.querySelector("#cafe-pets").checked;

    sendNewCafe(newCafeName,newCafeLocation,newCafeCost,newCafeNoise, newCafeGroup,newCafeWifi,newCafeFood,newCafeGluten,newCafeVeg,newCafePet);
});