const url = "http://api.prgrms-fe.xyz/events";
// const url = "http://api.prgrms-fe.xyz/events/66b79f555ea334885261bb09";


fetch(url, {
    method: 'GET', // GET 요청

})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); 
})
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});

