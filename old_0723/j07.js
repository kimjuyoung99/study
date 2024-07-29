// 함수
// 선언함수, 익명함수, 화살표 함수

function add(a, b) {
    console.log(a);              // 2, "첫번째"
    console.log(b);              // 5, "두번째"
    console.log(arguments);      // [Arguments] { '0': 2, '1': 5 }, [Arguments] { '0': "첫번째", '1': "두번째" }
    console.log(arguments[0]);   // 2, "첫번째"
    console.log(arguments[1]);   // 5, "두번째"
    return a + b;                // 7, "첫번째두번째"
}
add(2, 5);                      // 2, 5, [Arguments] { '0': 2, '1': 5 }, 2, 5
// 7
add("첫번째", "두번째");        // "첫번째", "두번째", [Arguments] { '0': "첫번째", '1': "두번째" }, "첫번째", "두번째"
// "첫번째두번째"


// 화살표로 사용하는 방법
const add2 = (c, d) => {
    console.log(c + d);         // 9
}
add2(4, 5);                     // 9

const cood = function (x, y) {};

// 즉시실행함수 IIFE
(function run() {
    console.log("작동");        // "작동"
})();
// 작동

let sum = add;
console.log(sum(4, 8));         // 4, 8, [Arguments] { '0': 4, '1': 8 }, 4, 8
// 12

sum3(1, 2, 3, 4, 5, 6);
function sum3(a, b, ...rest) {
    console.log(arguments);     // [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5, '5': 6 }
    console.log(a);             // 1
    console.log(b);             // 2
    console.log(rest);          // [3, 4, 5, 6]
}

//성적 반환 함수
function getGrade(score) {
    if (score === 100) {
        return 'A++++';
    } else if (score >= 50) {
        return 'A';
    }
}

const grad = getGrade(90);
console.log(grad); // 출력: 'A'


//[중요!!]콜백함수
const sum4 = (a,b) => a+b;
const min = (a,b) => a-b;
function calc(a,b, action){
    let result = action(a,b);
    console.log("calc : ",result);
}
calc(4, 5, sum4);//calc :  9
calc(4,5, min);//calc :  -1
