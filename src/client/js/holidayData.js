function getHolidayData() {
    const city = document.getElementById("city").value
    const country = document.getElementById("country").value
    const date = document.getElementById("date").value
    if (city && country && date) {
        return { city: city, country: country, date: date }
    }
    else {
        alert("You have entered a null value please try again.")
        return false
    }

}

export { getHolidayData }