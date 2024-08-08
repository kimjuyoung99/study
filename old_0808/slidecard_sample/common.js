const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

let id = 0; // 수정: id 변수 삭제해도 됨 (Date.now()로 대체)
let cardsEl = [];
let currentActiveCard = 0; //초기 선택된 카드 인덱스

let cardsData = JSON.parse(localStorage.getItem("cards")) || [];

// 새로고침 하지 않아도 카드 추가, 삭제 시 화면 갱신을 위해
// addCard 내부에 createCard 호출을 추가하여 로직 변경

const addCard = () => {
  const question = questionEl.value.trim();
  const answer = answerEl.value.trim();

  if (question && answer) {
    const newCard = { question, answer, id: Date.now() };
    cardsData.push(newCard);

    localStorage.setItem("cards", JSON.stringify(cardsData));

    questionEl.value = "";
    answerEl.value = "";
    toggleAddContainer(false);

    if (cardsData.length === 1) {
      // 첫 번째 카드 추가 시 createCards 호출
      createCards();
    } else {
      createCard(newCard, cardsData.length - 1); // 새 카드 추가 시 createCard 호출
    }

    cardsEl = Array.from(document.querySelectorAll(".card"));

    // 수정: 새 카드 추가 시 클래스 업데이트
    updateCardClasses();

    currentActiveCard = cardsData.length - 1;
    updateCurrentText();
  } else {
    alert("내용을 입력해 주세요");
  }
};

// 수정: 카드 클래스 업데이트 함수
const updateCardClasses = (isRefresh = false) => {
  cardsEl.forEach((card, index) => {
    if (index === 0 && isRefresh) {
      // 새로고침 시 첫 번째 카드만 active
      card.className = "card active";
    } else if (index === cardsEl.length - 1 && !isRefresh) {
      // 새 카드 추가 시 마지막 카드 active
      card.className = "card active";
    } else if (!isRefresh) {
      // 새 카드 추가 시 나머지 카드 left
      card.className = "card left";
    } else {
      // 새로고침 시 첫 번째 외 모든 카드 기본 상태
      card.className = "card";
    }
  });
};

const createCards = () => {
  cardsContainer.innerHTML = "";

  if (cardsData.length === 0) {
    // 카드 데이터가 없을 때
    cardsContainer.innerHTML = `
      <li class="card active noList"
        style="display: flex;
                justify-content: center;
                align-items: center;">
                  새로운 카드를 등록하세요
      </li>`;
    return;
  }

  cardsData.forEach((data, i) => createCard(data, i));

  cardsEl = Array.from(document.querySelectorAll(".card"));
  // 수정: 초기 로드 시 새로고침 상태로 클래스 업데이트
  updateCardClasses(true);
  updateCurrentText();
};

const createCard = (data, i) => {
  const card = document.createElement("li");
  card.classList.add("card");

  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${data.question}</p>
      </div>
      <div class="inner-card-back">
        <p>${data.answer}</p>
        <i class="deleteCard" data-id="${data.id}">삭제</i>
      </div>
    </div>
  `;

  card.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteCard")) {
      e.stopPropagation();
      deleteCard(data.id);
    } else {
      card.classList.toggle("show-card");
    }
  });

  cardsContainer.appendChild(card);
};

const deleteCard = (id) => {
  cardsData = cardsData.filter((card) => card.id !== id);
  localStorage.setItem("cards", JSON.stringify(cardsData));
  createCards();
  cardsEl = Array.from(document.querySelectorAll(".card"));
  currentActiveCard = Math.min(currentActiveCard, cardsEl.length - 1);
  updateCardClasses(true); // 수정: 카드 삭제 후 새로고침 상태로 클래스 업데이트
  updateCurrentText();
};

const clearCards = () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
};

const moveCard = (direction) => {
  if (cardsEl.length === 0) return;

  cardsEl[currentActiveCard].className = `card ${direction > 0 ? "left" : ""}`;
  currentActiveCard = Math.max(
    0,
    Math.min(currentActiveCard + direction, cardsEl.length - 1)
  );
  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
};

const updateCurrentText = () => {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
};

const toggleAddContainer = (show) =>
  addContainer.classList.toggle("show", show);

document.addEventListener("click", (e) => {
  if (e.target.closest(".noList")) {
    toggleAddContainer(true);
  }
});
showBtn.addEventListener("click", () => toggleAddContainer(true));
hideBtn.addEventListener("click", () => toggleAddContainer(false));
nextBtn.addEventListener("click", () => moveCard(1));
prevBtn.addEventListener("click", () => moveCard(-1));
addCardBtn.addEventListener("click", addCard);
clearBtn.addEventListener("click", clearCards);

createCards();
