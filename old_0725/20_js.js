//Map, Set 
// [0,1,2,3,4,0,1,2,3,4]
const set = new Set([1,2,3,1,2,3]);
console.log(set);// Set(3) { 1, 2, 3 }
console.log(set.size);// 3

console.log(set.has(8));// true
console.log(set.add(8));
console.log("---",set.delete(8));

console.log("---",set);
set.clear();
console.log("clear",set);

const obj1 = {name : "사과"};
const obj2 = {name : "포도"};
const obj3 = {name : "포도"};
const obj = new Set([obj1, obj2, obj3]);
console.log(obj);

obj.add(obj3);
console.log(obj);//Set(3) { { name: '사과' }, { name: '포도' }, { name: '포도' } }
obj.name = '퇌토마토마!!';
console.log(obj);
//Set(3) { { name: '사과' }, { name: '포도' }, { name: '포도' }, name: '퇌토마토마!!' }


//Map
const map = new Map([['key1','사과'],['key2','바나나']]);
console.log(map);//Map(2) { 'key1' => '사과', 'key2' => '바나나' }
console.log(map.size);//2
console.log(map.has("key1"));
console.log(map.has("key6"));

map.forEach( (value, key) => {
    console.log("key : ", key, "value : ", value);
});
// key :  key1 value :  사과
// key :  key2 value :  바나나

console.log(map.keys());//[Map Iterator] { 'key1', 'key2' }
console.log(map.values());//[Map Iterator] { '사과', '바나나' }
console.log(map.entries());//[Map Entries] { [ 'key1', '사과' ], [ 'key2', '바나나' ] }

map.set("key3","키위");
console.log(map);//Map(3) { 'key1' => '사과', 'key2' => '바나나', 'key3' => '키위' }
map.clear();
console.log(map);//Map(0) {}

const keys1 = {name : '우유', price:10};
const keys2 = {name : '우유', price:10, dsec: '맛있는 우유'};

const obj33 = {[keys1]: keys2};
console.log(obj33);//{ '[object Object]': { name: '우유', price: 10, dsec: '맛있는 우유' } }

const newMap = new Map([keys1, keys2]);
console.log(newMap);