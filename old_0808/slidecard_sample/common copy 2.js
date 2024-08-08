// elm
const $addContainer = document.getElementById("add-container");
const $current = document.getElementById("current");
const $question = document.getElementById("question");
const $answer = document.getElementById("answer");

// btns
const $show = document.getElementById("show");
const $hide = document.getElementById("hide");
const $clear = document.getElementById("clear");
const $prev = document.getElementById("prev");
const $next = document.getElementById("next");
const $addCard = document.getElementById("add-card");

// addContainer에서 추가하기 버튼을 클릭하면
// 1. 입력된 값의 유무확인하여 입력값이 없으면 메시지 출력 -> 입력해주세요
// 2. 입력값된 값은 localStorage에 저장
// 3. locaStorage에서 데이터 가지고와서 카드 생성

// 더미 데이터로 일단 연습
// const cardData = [
//   { question: "질문내용!!1", answer: "답변내용1" },
//   { question: "질문내용!!2", answer: "답변내용2" },
// ];

const cardData = JSON.parse(localStorage.getItem("cards")) || [];
console.log(cardData);

const addCard = () => {
  //   textarea의 value 가져오기
  const question = $question.value.trim();
  const answer = $answer.value.trim();
  console.log("작동", question, answer);

  if (question && answer) {
    //  cardData 에 내용추가
    const newCard = { question, answer };
    cardData.push(newCard);
    console.log(cardData);

    // localStorage 추가하기
    localStorage.setItem("cards", JSON.stringify(cardData));
    $question.value = "";
    $answer.value = "";

    // 추가하기 모달 닫기
    toggleClass(false);
  } else {
    alert("내용을 입력해주세요");
  }
};

// 추가하기 버튼을 클릭하면 카드 생성 함수 실행
$addCard.addEventListener("click", () => addCard());

const toggleClass = (show) => {
  $addContainer.classList.toggle("show", show);
};

$show.addEventListener("click", () => toggleClass(true));
$hide.addEventListener("click", () => toggleClass(false));
