/**
* @description Appends response data to page for multiple days
* @constructor
* @param response - contains response data to update display
*/

function updateMultipleDays(response) {
    const results = document.getElementById("results")
    const heading = document.createElement("h2")
    const location = document.getElementById("city").value
    heading.innerText = `Weather Forecast for ${location}`
    results.append(heading)
    const detailDiv = document.createElement("div")
    detailDiv.setAttribute("id", "details")
    results.appendChild(detailDiv)
    const details = document.getElementById("details")

    for (const [key, value] of Object.entries(response.weather)) {
        // Create Elements

        const elem = document.createElement("div")
        elem.setAttribute("id", value.date)
        details.appendChild(elem)


        const dayDate = document.createElement("p")
        const dayTemp = document.createElement("p")
        const dayDesc = document.createElement("p")



        const day = document.getElementById(value.date)
        dayDate.innerText = `Date: ${value.date}`
        dayTemp.innerText = `Temperature: ${value.temp}`
        dayDesc.innerText = `Description: ${value.description}`

        day.appendChild(dayDate)
        day.appendChild(dayTemp)
        day.appendChild(dayDesc)
    }

    const daysUntil = document.createElement("p")
    daysUntil.setAttribute("id", "days")
    daysUntil.innerText = `Days Until ${location}: ${response.until}`
    results.appendChild(daysUntil)

}


export { updateMultipleDays }
