/**
* @description Gets Saved Holiday from Express Server
*/

async function getSavedHoliday() {
    const response = await fetch("http://localhost:8080/getSavedTrip")
    const details = await response.json()

    if (details.city) {
        const saved = document.getElementById("saved")
        const h2 = document.createElement("h2")
        h2.innerText = "Saved Holiday"
        const city = document.createElement("p")
        city.innerText = details.city
        const country = document.createElement("p")
        country.innerText = details.country
        const date = document.createElement("p")
        date.innerText = details.date

        //Append
        saved.appendChild(h2)
        saved.appendChild(city)
        saved.appendChild(country)
        saved.appendChild(date)
    }
}

export { getSavedHoliday }