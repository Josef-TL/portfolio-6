const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let dataStore = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    dataStore.forEach(cafe => {
        const isVisible = cafe.cafe_name.toLowerCase().includes(value)
        cafe.element.classList.toggle("hide", !isVisible)
    })
})

fetch("http://localhost:3000/cafes")
    .then(response => response.json())
    .then(data => {
        console.log(data)

        dataStore = data.map(cafe => {
            const card = userCardTemplate.content.cloneNode(true).children[0]
            const header = card.querySelector("[data-header]")
            header.textContent = cafe.cafe_name
            userCardContainer.append(card)
            return {cafe_name: cafe.cafe_name, element: card}
        });

    });