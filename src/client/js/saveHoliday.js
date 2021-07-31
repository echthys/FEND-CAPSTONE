import { postReq } from './post'

async function saveHoliday() {
    const city = document.getElementById("city").value
    const country = document.getElementById("country").value
    const date = document.getElementById("date").value
    const data = { city: city, country: country, date: date }
    const response = await postReq("http://localhost:8080/saveTrip", data)
}

export { saveHoliday }