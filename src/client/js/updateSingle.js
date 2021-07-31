import { directive } from "@babel/types"

/**
* @description Appends response data to page for single day
* @constructor
* @param response - contains response data to update display
*/

function updateSingleDay(temp, description, until) {

    const results = document.getElementById("results")
    const heading = document.createElement("h2")
    const location = document.getElementById("city").value
    heading.innerText = `Current Weather in ${location}`
    results.append(heading)

    const elem = document.createElement("div")

    elem.setAttribute("id", "details")
    results.appendChild(elem)

    const details = document.getElementById("details")

    const daysUnitl = document.createElement("p")
    const dayTemp = document.createElement("p")
    const dayDesc = document.createElement("p")


    dayTemp.innerText = `Current Temp: ${temp}`
    dayDesc.innerText = `Description: ${description}`
    daysUnitl.innerText = `Days unitl ${location}: ${until}`

    details.appendChild(dayTemp)
    details.appendChild(dayDesc)
    details.appendChild(daysUnitl)
}


export { updateSingleDay }