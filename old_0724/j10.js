//static 키워드
class Fruite {
    static MAX = 4; //클래스 레벨의 프로퍼티 
    constructor(name,color){
        this.name = name;
        this.color = color;
    }
    //인스턴스 레벨의 메서드
    display =()=>{
        console.log(`${this.name} --- ${this.color}`);
    }
}
const banana = new Fruite('바나나','노랑');
console.log("객체 전체 ---", banana);
console.log("-----", banana.name);
console.log("-----", banana.color);
banana.display();

//static은 클래스가 인스턴스에서 전달되는 것은 없지만
//생성자 함수가 자체적으로 가지고 있어야 하는 변수들을 의미한다.
//변수 뿐만 아니라 함수에도 static함수를 만들 수 있고 static 프로퍼티도 만들 수 있음
//어떻게 만드느냐? -> 
