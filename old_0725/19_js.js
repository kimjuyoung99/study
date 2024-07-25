let array2 = ['바나나', '딸기', '포도', '딸기'];

function replace2 (arr2, from, to){
    return arr2.map((item) => ( item === from ? to : item));
}
let result2 = replace2(array2, "딸기", "키위");
console.log(result2);

//forEach();
const item1 = {name : "사이다", price : 1};
const item2 = {name : "쿠키", price : 3};
const item3 = {name : "김밥", price : 2};

const products = [item1 ,item2, item3];
console.log(products);
let result1 = products.find((item)=>item.name === "쿠키");
console.clear();
console.log(result1);//{ name: '쿠키', price: 3 }

//findIndex()
let result3 = products.findIndex((item)=>item.name === "쿠키");
console.clear();
console.log(result3);//1

//some()
let result4 = products.some((item)=>item.name === "쿠키");
console.clear();
console.log(result4);//true

//every()
let result5 = products.every((item)=>item.name === "쿠키");
console.clear();
console.log(result5);//false

//filter()
let result6 = products.filter((item)=>item.name === "쿠키");
console.clear();
console.log(result6);//[ { name: '쿠키', price: 3 } ]

//Map
const nums = [1,2,3];
let result7 = nums.map((item)=>item*2);
console.log(result7);//[ 2, 4, 6 ]

//flatmap
let result8 = nums.map((item)=>[1,2]);
console.log(result8);
let result9 = ['javascript', 'coding'].flatMap((text)=>text.split(""));
console.log(result9);

//sort()
const texts = ['hi','abc'];
console.log(texts);//[ 'hi', 'abc' ]
texts.sort();
console.log(texts);//[ 'abc', 'hi' ]

//reduce()
let result10 = [10, 20, 30, 40, 50, 60].reduce((sum, item)=> (sum+=item),0);
console.log(result10);//210
