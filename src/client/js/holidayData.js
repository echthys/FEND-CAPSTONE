function getHolidayData() {
    const city = document.getElementById("city").value
    const country = document.getElementById("country").value
    const date = document.getElementById("date").value

    return { city: city, country: country, date: date }
}

export { getHolidayData }