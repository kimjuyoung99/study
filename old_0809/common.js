const API_KEY = "d0a7cf804a344c35bde46d46e91291e0";

const $nav = document.getElementById("gnb");
const $searchBtn = document.querySelector(".searchBtn");
const $inputArea = document.querySelector(".inputArea input");

let url = new URL(`https://newsapi.org/v2/top-headlines`);
let pageSize = 3;
let page = 1;
let totalResults = 0;
let groupSize = 5;
let currentPage = 1;

// 페이지네이션을 위한 변수
let currentCategory = "general";
let currentQuery = null;

const fetchNews = async (category = "general", query = null, pageNum = 1) => {
  try {
    url.searchParams.delete("category");
    url.searchParams.delete("q");

    url.searchParams.set("apiKey", API_KEY);
    url.searchParams.set("country", "kr");
    url.searchParams.set("pageSize", pageSize);
    url.searchParams.set("page", pageNum);

    if (query) {
      url.searchParams.set("q", query);
      currentQuery = query;
      currentCategory = null;
    } else {
      url.searchParams.set("category", category);
      currentQuery = null;
      currentCategory = category;
    }

    console.log(url);

    const res = await fetch(url);
    const data = await res.json();
    newsList = data.articles;
    totalResults = data.totalResults;

    renderNews(newsList);
    pagination();
  } catch (e) {
    console.error(e);
  }
};
const movePage = (pageNum) => {
  page = pageNum;
  currentPage = pageNum;
  fetchNews(currentCategory, currentQuery, pageNum);
};
const pagination = () => {
  let pageGroup = Math.ceil(page / groupSize);
  let lastPage = Math.min(
    Math.ceil(totalResults / pageSize),
    pageGroup * groupSize
  );
  let firstPage = (pageGroup - 1) * groupSize + 1;
  //   let totalPage = totalResults;
  let totalPage = Math.ceil(totalResults / pageSize);
  let prevGroup = (pageGroup - 2) * groupSize + 1;
  let nextGroup = pageGroup * groupSize + 1;

  let paginationHtml = `<button class="next" ${
    pageGroup == 1 ? "disabled" : ""
  } onClick='movePage(${prevGroup})'>이전페이지그룹</button>`;

  paginationHtml += `<button class="next" ${
    pageGroup == 1 ? "disabled" : ""
  } onClick='movePage(${currentPage - 1})'>이전</button>`;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHtml += `<button class='${
      i == currentPage ? "on" : ""
    }' onClick='movePage(${i})'>${i}</button>`;
  }

  paginationHtml += `<button class="next" ${
    pageGroup * groupSize >= totalPage ? "disabled" : ""
  } onClick='movePage(${currentPage + 1})'>다음</button>`;

  paginationHtml += `<button class="next" ${
    pageGroup * groupSize >= totalPage ? "disabled" : ""
  } onClick='movePage(${nextGroup})'>다음페이지그룹</button>`;

  document.querySelector(".pgCon").innerHTML = paginationHtml;
};

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
            <a class="more" href="${news.url} target='_blank"></a>
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

const searchFn = () => {
  const searchWord = $inputArea.value;
  fetchNews(null, searchWord);
};
$searchBtn.addEventListener("click", () => {
  searchFn();
});
$inputArea.addEventListener("keyup", (e) => {
  if (e.key !== "Enter") return;
  searchFn();
});

fetchNews();