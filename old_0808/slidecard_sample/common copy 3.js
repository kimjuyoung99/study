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
// const cardsEl = []; //li 요소 리스트

const createCard = (data, i) => {
  // console.log(i, data);

  const card = document.createElement("li");
  card.classList.add("card");

  // 첫번째 카드에 active 클래스 적용
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

  //   cardsEl.push(card);
  $cardsContainer.appendChild(card);
};

// 카드생성
const createCards = () => {
  // cardData 빈배열일 때 - 새로운 카드를 등록해주세요
  if (cardData.length === 0) {
    $cardsContainer.outerHTML = `
        <ul id="cards-container" class="cards nolist">
            <li>새로운 카드를 등록해주세요</li>
        </div>
    `;
    return;
  }

  // 데이터의 수만큼 카드생성
  cardData.forEach((data, i) => createCard(data, i));
};

createCards();

const addCard = () => {
  const question = $question.value.trim();
  const answer = $answer.value.trim();
  console.log("작동", question, answer);
  if (question && answer) {
    const newCard = { question, answer };
    cardData.push(newCard);

    localStorage.setItem("cards", JSON.stringify(cardData));
    $question.value = "";
    $answer.value = "";
    toggleClass(false);
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
