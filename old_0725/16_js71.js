let arr1 = [1,2,3,4,5];

console.log(arr1);
console.log(arr1);

let arr2 = new Array(1,2,3);
console.log(arr1);

let arr3 = Array.of(5,6,7,8);
console.log(arr3);

let arr4 = Array.from({
    0 : "안",
    1 : "녕",
})
console.log(arr4);

console.clear();

const fruits = ["딸기", "포도", "사과", "복숭아"];
console.log(fruits[0]);
console.log(fruits.length);
for(let i = 0 ; i < fruits.length ; i++){
    console.log(fruits[i]);
}
fruits[4] = "수박";//별로 안좋은 방법!
console.log(fruits);

console.log(Array.isArray(fruits));
console.log(Array.isArray({}));

// const fruits = ["바나나","딸기", "포도", "복숭아"];
console.log(fruits.indexOf("키위"));//-1
console.log(fruits.includes("키위"));//false

// 추가 - 제일 뒤 .push()
let arr6 = fruits.push("초코");
console.log(fruits);
console.log(arr6);

//추가 - 제일 앞 .unshift()
let arr7 = fruits.unshift("파파야");
console.log(fruits);
console.log(arr7);

// ---------------
console.clear();
// const fruits = ["바나나","딸기", "포도", "복숭아"];

let newarr1 = fruits.slice(0,3);//배열 
console.log(fruits);
console.log(newarr1);//[ '파파야', '딸기', '포도' ]

const newarr2 = fruits.concat(newarr1);
console.log("---", newarr2);

const newarry3 = [...arr1, ...arr2];
console.log(newarry3);

console.log(newarry3.reverse());

let arrA1 = [1,2,[31,32,[331,332]],4,5,[62,62,63]];
console.log(arrA1.flat());//[ 1, 2, 31, 32, [ 331, 332 ], 4, 5, 62, 62, 63 ]
//1차 depth 까지는 펼쳐 준다
console.log(arrA1.flat(2));//[1, 2, 31, 32, 331, 332, 4,  5, 62,  62, 63]
//.flat(숫자) 만큼 depth에서 펼쳐준다.

console.log(arrA1.fill("s",1,3));//[ 1, 's', 's', 4, 5, [ 62, 62, 63 ] ]


let text = ["집에","가고","싶다"];
console.log(text);//[ '집에', '가고', '싶다' ]
console.log(text.join(" "));//집에 가고 싶다
console.log(text.join(""));//집에가고싶다
console.log(text.join("0"));//집에0가고0싶다