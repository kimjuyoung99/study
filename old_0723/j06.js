//제어문 if, for, switch, while, 삼항연산자

//if(조건){실행문}
//if(조건){실행문} else{}
//if(조건){실행문} else if(조건2){실행문} else{실행문}
//Falshy / truthy 

// 삼항 조건 연산자
let fruit = 'apple'
if(fruit == 'apple'){
    console.log("그래 사과다");
} else {
    console.log("사과아님 쏴리");
}
//그래 사과다

fruit === "apple" ? console.log("응 사과") : console.log("아니");//응 사과
let test = fruit === "apple" ? "사과" : "아님";
console.log(test);//사과

let today = new Date();
console.log(today.toLocaleDateString());//7/29/2024

let day = today.getDay();
let dayName;
console.log(day);
if(day === 0){
    dayName = '일요일';
} else if (day===1){
    dayName = "월요일";
} else if (day===2){
    dayName = "화요일";
} else {
    dayName = "나머지 요일은 중요치 않다";
}
console.log(dayName);//월요일

//switch문
switch(day){
    case 0 :
        dayName = '월요일';
        break;
    case 1 :
        dayName = '화요일';
        break;
    default:
        dayName = "모른다";
        break;
}
console.log(dayName);//화요일

//for문
for(let i = 0 ; i < 10 ; i++){
    if(i === 5){
        continue;
    }
    console.log(i);
}

let test2 = ["일","이","삼","사"];

//for + 자동완성 하고 tap 하면 편하게 할 수 있다
// for (let index = 0; index < array.length; index++) {
//     const element = array[index];
// }

//유사배열을 만났을 때는, 반복문을 쓸 수밖에 없다(고차함수 못 씀)
test2.forEach((item,i,arr)=>{
    console.log("---------");
    console.log(item);//일
    console.log(i);//0
    console.log(arr);//[ '일', '이', '삼', '사' ]
});

//제어문과 함께 사용되는 논리 연산자 && || ! !!
let num = 28;
if(num >= 0 && num < 20){
    console.log("해당된다");
}