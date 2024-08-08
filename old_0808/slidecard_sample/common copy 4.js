// elm
const $addContainer = document.getElementById("add-container");
const $cardsContainer = document.getElementById("cards-container");
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

const cardData = JSON.parse(localStorage.getItem("cards")) || [];
console.log(cardData);

// [새로운 카드를 등록 하세요]를 클릭하면 toggleClass(true) 실행 V
// 게시물 관리를 위한 id 생성
// 다음 버튼 클릭하면 카드 이동 함수 실행
// 카드 이동 함수 내부에서 사용될 li 요소 리스트 const cardsEl = [];
// 현재 카드를 인식하기 위한 currentActiveCard = 0 선언

let id = 0;
let cardsEl = [];

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

  card.addEventListener("click", () => card.classList.toggle("show-card"));

  cardsEl.push(card);
  $cardsContainer.appendChild(card);
};

// 카드생성
const createCards = () => {
  if (cardData.length === 0) {
    $cardsContainer.outerHTML = `
        <ul id="cards-container" class="cards nolist">
            <li>새로운 카드를 등록해주세요</li>
        </div>
    `;
    return;
  }

  cardData.forEach((data, i) => createCard(data, i));
};

createCards();

const addCard = () => {
  const question = $question.value.trim();
  const answer = $answer.value.trim();

  if (question && answer) {
    const newCard = { question, answer, id: id++ };
    cardData.push(newCard);

    localStorage.setItem("cards", JSON.stringify(cardData));
    $question.value = "";
    $answer.value = "";
    toggleClass(false);
    updateCurrentText();
  } else {
    alert("내용을 입력해주세요");
  }
};

$addCard.addEventListener("click", () => addCard());

const toggleClass = (show) => {
  $addContainer.classList.toggle("show", show);
};

$show.addEventListener("click", () => toggleClass(true));
$hide.addEventListener("click", () => toggleClass(false));
document.addEventListener("click", (e) => {
  if (e.target.closest(".nolist")) {
    toggleClass(true);
  }
});

console.log(cardsEl);

let currentActiveCard = 0;
const moveCard = (direction) => {
  cardsEl[currentActiveCard].className = `card ${direction > 0 ? "left" : ""}`;
  currentActiveCard = Math.max(
    0,
    Math.min(currentActiveCard + direction, cardsEl.length - 1)
  );
  cardsEl[currentActiveCard].className = `card active`;
  updateCurrentText();
};

$next.addEventListener("click", () => moveCard(1));
$prev.addEventListener("click", () => moveCard(-1));

function updateCurrentText() {
  $current.innerText = ` ${currentActiveCard + 1}/${cardsEl.length} `;
}

$clear.addEventListener("click", () => {
  localStorage.clear("cards");
  $cardsContainer.innerHTML = "";
  updateCurrentText();
  window.location.reload();
});
