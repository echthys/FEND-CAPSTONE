// JS Imports

import { getHolidayData } from './js/holidayData'
import { postReq } from './js/post'
import { setDate } from './js/setDate'

// SASS Imports 

import './styles/styles.scss'


document.getElementById("generate").addEventListener("click", async () => {

    const temp = document.getElementById("weatherTemp")
    const desc = document.getElementById("weatherDesc")
    const days = document.getElementById("days")

    const localImage = document.getElementById("image")
    if (localImage) {
        localImage.remove()
    }
    const data = getHolidayData()
    const response = await postReq("http://localhost:8080/getData", data)
    if (response.weather.temp) {
        temp.innerText = response.weather.temp
        desc.innerText = response.weather.description
        days.innerText = response.until
    }
    else {
        

    }
    const image = document.createElement("img")
    image.setAttribute("src", response.image)
    image.setAttribute("id", "image")
    document.getElementsByClassName("data")[0].appendChild(image)

})

setDate()

