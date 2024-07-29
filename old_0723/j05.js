// 표현식, 문, 리터럴

// 산술연산자 + - * % / **
console.log(2+3);
console.log(11%2);
console.log(5**2);
console.log(Math.pow(5,2));

let text = "두개의" + "문자를 합";
text = "1" + 1;
console.log(text);

// 단항연산자 - + , !
let a = 5;
a = -a;
console.log(a);//-5

console.log(+true);
console.log(+null);
console.log(+"");
console.log(+false);
console.log(+"ttt");
console.log(+undefined);

console.log(!!a);

let aa = 1;
aa = aa + 2;
aa += 2;

// 증가 감소 연산자
aa++; // aa = aa + 1
aa--; // aa = aa - 1

//aa++
//++aa

//대소관계 연산자 >, <. >=, <=
console.log(2 > 3);
let result = 3 + (5 * 8) / 2;

//동등 비교 관계 연산자
// ==, !=, ===, !==
let obj1 = {name : 'somy'}
let obj2 = {name : "somy"}
console.log(obj1 == obj2);
console.log(obj1.name === obj2.name);


// && || 