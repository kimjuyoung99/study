console.clear();
//퀴즈1 : 주어진 배열 안의 딸기 아이템을 키위로 교체하는 함수 만들기
function replace(arr, from, to){
    for(let i = 0 ; i < arr.length ; i++){
        if(arr[i] == from) arr[i] = to;
    }
    return arr;
}
const map = (f, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(f(a));
    }
    return res;
};
const iDontLikeStrawbarry = (a) => {
    if(a === "딸기") return "키위";
    return a;
};
function replace2(input, from, to){
    return input.map((val) => (val === from ? to : val));
}
let array = ['바나나', '딸기', '포도', '딸기'];
const result = replace(array,"딸기","키위");
const result2 = map(iDontLikeStrawbarry, array);

console.log(result);
console.log(replace(array,"딸기","키위"));


//배열안에 '딸기'가 몇개 있는지 count 함수 만들기
let array2 = ['바나나', '딸기', '포도', '딸기'];
function findStrawbarry(arr,target){
    let count = 0;
    for(const word of arr){
        if(word === target) count++;
    }
    return count;
}
console.log(findStrawbarry(array2,'딸기'));