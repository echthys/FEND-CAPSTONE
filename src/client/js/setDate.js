function setDate() {
    const dateControl = document.querySelector('input[type="date"]');
    const date = new Date();
    date.setDate(date.getDate() + 1);
    dateControl.setAttribute("min", date.toISOString().slice(0, 10))

}

export { setDate }