// btns
const $show = document.getElementById("show");
const $hide = document.getElementById("hide");
const $clear = document.getElementById("clear");
const $prev = document.getElementById("prev");
const $next = document.getElementById("next");
const $addCard = document.getElementById("add-card");

const cardData = JSON.parse(localStorage.getItem("cards")) || [];
console.log(cardData);

// [새로운 카드를 등록 하세요]를 클릭하면 toggleClass(true) 실행
// 게시물 관리를 위한 id 생성
// 다음 버튼을 클릭하면 카드 이동 함수 실행
// 카드 이동 함수 내에서 사용될 li 요소 리스트 const cardsEl = [];
// 현재 카드를 인식하기 위한 currentActiveCard = 0 선언

let id = 0;
let cardEl = [];
const createCard = (data, i) => {
  const card = document.createElement("li");
  card.classList.add("card");

  if (i === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${data.question}</p>
      </div>
      <div class="inner-card-back">
        <p>${data.answer}</p>
      </div>
    </div>
  `;
  cardEl.push
  card.addEventListener("click", () => card.classList.toggle("show-card"));
};

$show.addEventListener("click",()=>toggleClass(true));
$show.addEventListener("click",()=>toggleClass(false));
document.addEventListener("click",(e)=>{
    if(e.target.closet(".nolist")){
        toggleClass(true);
    }
});

