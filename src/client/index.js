// JS Imports

import { getHolidayData } from './js/holidayData'
import { postReq } from './js/post'
import { setDate } from './js/setDate'
import { resetResults } from './js/resetResults'
import { updateSingleDay } from './js/updateSingle'
import { updateMultipleDays } from './js/updateMulti'
import { appendImage } from './js/appendImage'


// SASS Imports 

import './styles/styles.scss'
import './styles/results.scss'
import './styles/info.scss'

document.getElementById("generate").addEventListener("click", async () => {
    const data = getHolidayData()
    if (data) {
        const response = await postReq("http://localhost:8080/getData", data)
        if (response.weather.temp) {
            resetResults()
            updateSingleDay(response.weather.temp, response.weather.description, response.until)
            appendImage(response)
        }
        else {
            resetResults()
            updateMultipleDays(response)
            appendImage(response)
        }
    }

})

// Sets the min date value on calendar 
setDate()

