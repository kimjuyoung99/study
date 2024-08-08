// elm
const $addContainer = document.getElementById("add-container");
const $current = document.getElementById("current");

// btns
const $show = document.getElementById("show");
const $hide = document.getElementById("hide");
const $clear = document.getElementById("clear");
const $prev = document.getElementById("prev");
const $next = document.getElementById("next");

// 항목추가 버튼을 클릭하면 .add-container요소에 .show toggle 됨
const toggleClass = (show) => {
  $addContainer.classList.toggle("show", show);
};

$show.addEventListener("click", () => toggleClass(true));
$hide.addEventListener("click", () => toggleClass(false));
