//This is how to submit data by a fetch call
submitButton.addEventListener("click",()=>{

    const jsonObjectToPost = {
        cafe_id:id,
        cafe_name:'name'
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

});
