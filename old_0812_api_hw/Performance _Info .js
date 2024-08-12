const url = "http://api.prgrms-fe.xyz/events?page=2&limit=16";

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
    const events = data.events; // 배열 데이터가 'events'라는 키에 있을 가능성
    if (!Array.isArray(events)) {
        throw new Error('Expected an array but got something else.');
    }

    const eventBox = document.querySelector('.eventBox');
    
    // 데이터를 순회하면서 박스 생성
    events.forEach((event, index) => {
        // 새로운 div 요소 생성
        const box = document.createElement('div');
        box.className = 'box';

        // TITLE 값 삽입
        box.textContent = event.TITLE;

        // 박스를 eventBox에 추가
        eventBox.appendChild(box);
    });
})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});
