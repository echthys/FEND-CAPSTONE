/**
* @description Posts Data to Server
* @constructor
* @param url - url for post request
* @param data - Data to send to server
*/

async function postReq(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const updatedData = await res.json();
        return updatedData;
    } catch (error) {
        console.log('error', error);
    };

}


export { postReq }