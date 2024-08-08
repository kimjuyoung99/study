// HTML에서 id가 "itemInput"인 요소 선택
const $itemInput = document.getElementById("itemInput");
// HTML에서 id가 "addBtn"인 요소 선택
const $addBtn = document.getElementById("addBtn");
// HTML에서 id가 "items"인 요소 선택
const $items = document.getElementById("items");

// 로컬 스토리지에서 저장된 쇼핑목록 가져오고, 없으면 빈 배열로 초기화
let shopList = JSON.parse(localStorage.getItem("shopList")) || [];
// 현재 리스트에 있는 항목 중 가장 큰 id 찾아 그 다음 id 설정. 리스트가 비어있으면 0으로 초기화
let id =
  shopList.length > 0 ? Math.max(...shopList.map((item) => item.id)) + 1 : 0;

// shopList.lenght > 0
// Math.max(...shopList.map(item => item.id))+1

// 페이지 로드 시 입력 필드에 포커스 줌
$itemInput.focus();

// shopList 배열을 localStorage에 저장하는 함수
const saveToLoacalStorage = () => {
  localStorage.setItem("shopList", JSON.stringify(shopList));
};

// 새로운 쇼핑 항목 생성하는 함수
//엔터키나 + 버튼을 눌렀을때, 한 번 load 되었을때 실행된다.
const creatItem = (item) => {
  const $li = document.createElement("li");
  // li 요소에 "item" 클래스 추가하고 항목의 id 설정
  $li.setAttribute("class", "item");
  $li.setAttribute("data-num", item.id);
  // 항목의 텍스트와 삭제 버튼 추가
  $li.innerHTML = `
        <span>${item.text}</span>
        <i class="deletBtn fa-solid fa-trash-can" data-id="${item.id}"></i>
    `;
  return $li;
};

// 항목 추가하는 함수
const onAdd = () => {
  const text = $itemInput.value;
  // 입력 필드가 비어있으면 함수 종료하고 입력 필드에 포커스 줌
  if (text === "") {
    $itemInput.focus();
    return;
  }

  // 새로운 아이템 객체 생성하고 shopList 배열에 추가
  const newItem = { id: id++, text: text };
  shopList.push(newItem);
  saveToLoacalStorage();

  // 새로운 항목 생성하고 리스트에 추가
  const item = creatItem(newItem);
  $items.appendChild(item);
  // 새로 추가된 항목이 보이도록 스크롤
  item.scrollIntoView({ block: "end" });

  // 입력 필드 초기화하고 포커스 줌
  $itemInput.value = "";
  $itemInput.focus();
};

// 추가 버튼 클릭하면 onAdd 함수 호출
$addBtn.addEventListener("click", () => {
  onAdd();
});

// 입력 필드에서 엔터키 누르면 onAdd 함수 호출
$itemInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") onAdd();
});

// items 리스트 클릭했을 때 발생하는 이벤트
$items.addEventListener("click", (e) => {
  let id = e.target.dataset.id;
  // 클릭된 요소의 data-id 값 가져와 id 변수에 저장
  if (id) {
    id = parseInt(id);
    // 해당 id를 가진 항목을 shopList 배열에서 제거
    shopList = shopList.filter((item) => item.id !== id);
    saveToLoacalStorage();

    // DOM에서 해당 항목 찾아 제거
    const deleteItem = document.querySelector(`.item[data-num='${id}']`);
    deleteItem.remove();
  }
});

// 페이지 로드 시 shopList 배열에 있는 항목들을 DOM에 추가하는 함수
const loadItems = () => {
  $items.innerHTML = "";
  shopList.forEach((item) => {
    const itemElm = creatItem(item);
    $items.appendChild(itemElm);
  });
};
// 스크립트가 처음 로드될 때 loadItems 함수 호출
loadItems();