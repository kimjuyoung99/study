console.clear();
//딥카피?? 
const bab = {name : '김밥', price : 2}
const ramen = {name : '라면', price : 1}
const ham = {name : '햄버거', price : 3}

//리터럴 정보대로 객체를 넣었기 때문에 배열 안에 객체 리스트가 나와있다
const store1 = [bab, ramen, ham];
console.log("---store1---",store1);
// [
//     { name: '김밥', price: 2 },
//     { name: '라면', price: 1 },
//     { name: '햄버거', price: 3 }
//   ]

const store2 = Array.from(store1);
console.log("---store2---",store2);

store2.push(ham);
console.log("---store1---",store1);
console.log("---store2---",store2);
// ---store1--- [
//     { name: '김밥', price: 2 },
//     { name: '라면', price: 1 },
//     { name: '햄버거', price: 3 }
//   ]
// ---store2--- [
//     { name: '김밥', price: 2 },
//     { name: '라면', price: 1 },
//     { name: '햄버거', price: 3 },
//     { name: '햄버거', price: 3 }
//   ]
bab.price = 10;
console.log("---store1---",store1);
console.log("---store2---",store2);
// ---store1--- [
//     { name: '김밥', price: 10 },
//     { name: '라면', price: 1 },
//     { name: '햄버거', price: 3 }
//   ]
// ---store2--- [
//     { name: '김밥', price: 10 },
//     { name: '라면', price: 1 },
//     { name: '햄버거', price: 3 },
//     { name: '햄버거', price: 3 }
//   ]

//딥카피란!
const newStore = JSON.parse(JSON.stringify([bab,ramen,ham]));
console.log("--newStore----",newStore);
// [
//     { name: '김밥', price: 10 },
//     { name: '라면', price: 1 },
//     { name: '햄버거', price: 3 }
// ]

