const $hamBtn = document.querySelector('.hamBtn');
const $gnb = document.querySelector('.gnb');
$hamBtn.addEventListener('click',()=>{
    $gnb.classList.toggle("on");
});