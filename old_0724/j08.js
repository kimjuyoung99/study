// 객체
let apple = {
    0: "test1",
    name: "somy",
    ["hello bye"]: "안녕",
    "age-num": () => {}
};
// key - 숫자, 문자, 문자열 'test-test', ['문자열'], 심볼
// value = 원시값, 객체 (함수)

// 객체를 만드는 방법
// 1. 객체 리터럴로 만들기
// 2. 클래스 객체로 만들기 new Object()
// 3. Object.create()
let sample = {};
//대괄호 표기법은 언제 쓰이는가?
console.log(apple.name); // somy
console.log(apple["hello bye"]); // 안녕
console.log(apple[0]); // test1

//객체에 속성 데이터 추가
apple.emoji = '예쁜사과';
console.log(apple); // { '0': 'test1', name: 'somy', 'hello bye': '안녕', 'age-num': [Function: age-num], emoji: '예쁜사과' }
//객체 속성 삭제
delete apple.emoji;
console.log(apple); // { '0': 'test1', name: 'somy', 'hello bye': '안녕', 'age-num': [Function: age-num] }

const obj1 = {
    name: "개냥이",
    age: 2,
};

console.log(obj1.name); // 개냥이
//정적으로 할 수 있겠지만
//동적으로 접글할 경우 -> 대괄호 사용!
function getValue(object, key){
    return object[key];//대괄호
}
console.log("getValue-- ", getValue(obj1, 'name')); // getValue--  개냥이


const x = 10;
const y = 20;
// const coord = {x:x, y:y};
const coord = {x,y};
console.log(coord); // { x: 10, y: 20 }

function makeObj(name,age){
    return {name,age}
}
console.clear();
const person = makeObj('samypage',5);
console.log(person);// { name: 'samypage', age: 5 }

const apple2 = {
    name: "사과",
    display : function(){
        console.log(`함수 내부의 변수명 속성값 - ${this.name}`);
    },
};
apple2.display(); // 함수 내부의 변수명 속성값 - 사과
console.log(this); // {}

//this : 이벤트가 된 대상을 말하던지, 내 부모 객체를 말하던지!

//$0 -> 콘솔에서 
//브라우져에서 this : window
//브라우져에서 global this : window
//node 에서 this : 전역객체


//생성자 함수
function Fruite(name, color){
    this.name = name,
    this.color = color
    this.display = () => {
        console.log(`${this.name},${this.color}`);
    };
}
//대문자로 시작
const orange = new Fruite('오렌지','노랑');
const banana = new Fruite('바나나','찐노랑');

console.log(orange); // Fruite { name: '오렌지', color: '노랑', display: [Function (anonymous)] }
console.log(banana); // Fruite { name: '바나나', color: '찐노랑', display: [Function (anonymous)] }

