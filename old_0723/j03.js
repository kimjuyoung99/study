let isFree = true;
let isActive = false;
// 변수 앞에 !! 붙이면 불리언 타입을 확인 가능

console.log(!!0);           // false
console.log(!!-0);          // false
console.log(!!"");          // false
console.log(!!null);        // false (값이 그냥 비어있음)
console.log(!!undefined);   // false
console.log(!!NaN);         // false

console.log(!!1);           // true
console.log(!!-1);          // true
console.log(!!{});          // true
console.log(!!Infinity);    // true
