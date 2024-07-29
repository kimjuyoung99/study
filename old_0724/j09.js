//생성자 함수를 만들었던 것을 class로 바꿔보기
//객체지향 프로그래밍이란 것은 '템플릿'을 만드는 것.
//class는 객체를 만들기 위한 템플릿으로 많이 쓰이고 있다.

// class 로 그대로 만들어 보기
class Fruite {
    constructor(name, color) {
        this.name = name; // name과 color를 this에 할당
        this.color = color; // name과 color를 this에 할당
    }
    // 위의 constructor에 display를 넣을 수는 있다. this.display로
    // 근데 그러면 고정값이 되게 된다!(물론, 안되는건 아니다.)
    // 그래서 보통 바깥에 적는다.
    display = () => {
        console.log(`${this.name} : ${this.color}`);
    };
}
// 새로운 생성자를 만들었으니, 접근해보자
const apple = new Fruite('사과', '빨강');
console.log(apple); // Fruite { name: '사과', color: '빨강', display: [Function: display] }
apple.display(); // 사과 : 빨강