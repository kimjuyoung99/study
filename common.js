const API_KEY = "d0a7cf804a344c35bde46d46e91291e0";

const $nav = document.getElementById("gnb");
const $searchBtn = document.querySelector(".searchBtn");
const $inputArea = document.querySelector("")

let url = new URL(`https://newsapi.org/v2/top-headlines`);
let pageSize = 6;
let page = 1;
let totalResults = 0;

const fetchNews = async (category = "general", query = null) => {
  try {
    url.searchParams.dalete("category")
    url.searchParams.set("apiKey", API_KEY);
    url.searchParams.set("country", "kr");
    url.searchParams.set("pageSize", pageSize);
    url.searchParams.set("page", page);
    url.searchParams.set("category", category);
    url.searchParams.set("q", query);

    console.log(url);
    if(query){
        url.searchParams.set("q",query);
    } else {
        url.searchParams.set("category", category);
    }

    const res = await fetch(url);
    const data = await res.json();
    newsList = data.articles;
    renderNews(newsList);
  } catch (e) {
    console.error(e);
  }
};
const pagination =()=>{
    let pageGroup = Math.ceil(page/grupSize);
    let lastPage = Math.min(totalPage, pageGroup*groupSize);
    let firstPage = (pageGroup - 1)*groupSize + 1;
    let pagenationHtml =`<button class="prev">이전</button>`;
    for(let i = 1 ; i < 10 ; i++){
        pagination+=`<button>${i}</button>`
    }
    pagenationHtml += `<button class="next">다음</button>`;
    document.querySelector(".pgCon").innerHTML = paginationHtml;
}

const createHtml = (news) => {
  let urlToImage = news.urlToImage || "./No_Image.jpg";
  let title = news.title || "제목없음";
  let description = news.description
    ? news.description.length > 100
      ? news.description.substring(0, 100) + "..."
      : news.description
    : "내용이 없어요";
  let author = news.author || "작성자없음";
  let publishedAt = news.publishedAt
    ? new Date(news.publishedAt).toISOString().slice(0, 10)
    : "";
  let source = news.source ? news.source.name || "출처없음" : "출처없음";

  return `<li>
            <div class="newsImg"><img src="${urlToImage}" alt="" /></div>
            <p class="title">${title}</p>
            <p class="desc">${description}</p>
            <p class="source">${author}</p>
            <p class="source">${source}</p>
            <p class="date">${publishedAt}</p>
            <a class="more" href="">${news.url}</a>
          </li>`;
};

const renderNews = (newsList) => {
  console.log(newsList);
  const newsHtml = newsList.map((news) => createHtml(news)).join("");
  document.getElementById("listCon").innerHTML = newsHtml;
};

$nav.addEventListener("click", (e) => {
  console.log(e.target.dataset.cate);
  if (e.target.tagName !== "BUTTON") return;
  let category = e.target.dataset.cate;
  fetchNews(category);
});

const searchFn=()=>{
    const searchWord = $inputArea.value;

}

$searchBtn.addEventListener("click",(e)=>{
    searchFn();
})
$inputArea.addEventListener("keyup",(e)=>{
    if(e.key !== "Enter") return
    searchFn();
})

fetchNews();