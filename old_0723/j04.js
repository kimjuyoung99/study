// key 타입
let apple = {
    name: '사과',
    color: '빨강',
    display: () => {
        console.log("사과다");
    },
};

let orange = apple;

console.log(orange); 
// 출력: { name: '사과', color: '빨강', display: [Function: display] }

orange['name']; // 동적으로 처리할 때 많이 사용됨

orange.name = "오렌지";
console.log("오렌지", orange); 
// 출력: 오렌지 { name: '오렌지', color: '빨강', display: [Function: display] }

console.log("사과", apple); 
// 출력: 사과 { name: '오렌지', color: '빨강', display: [Function: display] }
//orange와 동일한 객체를 참조하므로 name 속성이 "오렌지"로 변경된 apple 객체를 출력

//let 이 아니라 const 객체라면? -> heap에 저장되기 때문에 동일하게 내용을 변경할 수 있다! 
//가르키고 있는건 '주소'이다.

console.log(typeof orange);//object
console.log(typeof orange.display);//function
console.log(typeof orange.name);//string

// 변수는 변수가 지정된 주소를 참조하는 것.
// 그 주소에 가보면, 변수에 할당한 값이 있다. 
// 데이터 타입은 원시 타입, 객체 타입이 있는데
// 객체 타입 : 메모리 상에 저장되는 공간이 heap
