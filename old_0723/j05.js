// 표현식, 문, 리터럴

// 산술연산자 + - * % /
console.log(2 + 3);       // 5
console.log(11 % 2);      // 1
console.log(5 ** 2);      // 25
console.log(Math.pow(5, 2)); // 25

let text = "두개의" + "문자를 합";
text = "1" + 1;
console.log(text);        // '11'

// 단항연산자 - + , !
let a = 5;
a = -a;
console.log(a);           // -5

console.log(+true);       // 1
console.log(+null);       // 0
console.log(+"");         // 0
console.log(+false);      // 0
console.log(+"ttt");      // NaN
console.log(+undefined);  // NaN

console.log(!!a);         // true (a는 -5로 true 값으로 평가)

let aa = 1;
aa = aa + 2;
aa += 2;

// 증가 감소 연산자
aa++; // aa = aa + 1
aa--; // aa = aa - 1

//aa++
//++aa

// 대소관계 연산자 >, <. >=, <=
console.log(2 > 3);       // false
let result = 3 + (5 * 8) / 2;

// 동등 비교 관계 연산자
// ==, !=, ===, !==
let obj1 = { name: 'somy' }
let obj2 = { name: "somy" }
console.log(obj1 == obj2);          // false (객체는 참조가 다름)
console.log(obj1.name === obj2.name); // true (문자열 값이 동일함)
