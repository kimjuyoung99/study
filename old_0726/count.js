let count = 0;

export default function inc() {
    count++;
    console.log(count);
}

// 각각의 차이점을 보면서 알아가자!

// export function inc() {
//     count++;
//     console.log(count);
// }

export default function getCount(){
    return count;
}