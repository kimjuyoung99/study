console.clear();

function getBanana(){
    return new Promise((resolve)=> {
        setTimeout(()=> {
            resolve("바나나");
        }, 1000);
    });
}

function getApple(){
    return new Promise((resolve)=>{
        setTimeout(()=> {
            resolve("사과");
        }, 3000);
    });
}

function fetchFruite(){
    const banana = getBanana();
    const apple = getApple();
    return [banana,apple];
}

fetchFruite();
fetchFruite().then()