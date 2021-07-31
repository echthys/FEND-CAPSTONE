/**
* @description Appends an image
* @constructor
* @param response - contains image url
*/

function appendImage(response) {
    const image = document.createElement("img")
    image.setAttribute("src", response.image)
    image.setAttribute("id", "image")
    document.getElementById("results").appendChild(image)
}

export { appendImage }