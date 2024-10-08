document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "f21ecfa7ce04ed1c5ddf3919ba7a8278";
  const baseUrl = "https://api.themoviedb.org/3";
  const eventBox = document.querySelector(".eventBox");
  let page = 1;
  let isLoading = false;
  let currentCategory = "top_rated";
  

//검색 기능
  const searchInput = document.querySelector('.inputArea input');
  const searchButton = document.querySelector('.searchBtn');

  searchButton.addEventListener('click', performSearch);

  function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
      const searchUrl = `${baseUrl}/search/movie?api_key=${apiKey}&language=ko-KR&query=${encodeURIComponent(query)}&include_adult=false&page=1`;
      
      eventBox.innerHTML = ''; // 기존 영화 목록 제거
      page = 1; // 페이지 초기화
      
      fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
          console.log("Search Results:", data);
          data.results.forEach(movie => {
            renderMovieBox(movie);
          });
        })
        .catch(error => {
          console.error("Error searching movies:", error);
        });
    }
  }

    // Enter 키 눌러도 검색 가능
   searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });



  document
    .querySelector(".topRated")
    .addEventListener("click", () => changeCategory("top_rated"));
  document
    .querySelector(".upComing")
    .addEventListener("click", () => changeCategory("upcoming"));
  document
    .querySelector(".nowPlaying")
    .addEventListener("click", () => changeCategory("now_playing"));

    //미리보기 특정 글자 갯수 넘으면 ... 처리
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  //영화 목록 각각 불러오기
  function fetchMovies() {
    if (isLoading) return;
    isLoading = true;

    let url;
    switch (currentCategory) {
      case "top_rated":
        url = `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=ko-KR&page=${page}`;
        break;
      case "upcoming":
        url = `${baseUrl}/movie/upcoming?api_key=${apiKey}&language=ko-KR&page=${page}`;
        break;
      case "now_playing":
        url = `${baseUrl}/movie/now_playing?api_key=${apiKey}&language=ko-KR&page=${page}`;
        break;
      default:
        url = `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=ko-KR&page=${page}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data);

        const currentDate = new Date();

        data.results.forEach((movie) => {
          const releaseDate = new Date(movie.release_date);
          let shouldRender = false;

          switch (currentCategory) {
            case "top_rated":
              shouldRender = true;
              break;
            case "upcoming":
              shouldRender = releaseDate > currentDate;
              break;
            case "now_playing":
              shouldRender = releaseDate <= currentDate;
              break;
          }

          if (shouldRender) {
            renderMovieBox(movie);
          }
        });
        page++;
        isLoading = false;
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        isLoading = false;
      });
  }

  //영화 박스 랜더링 하기
  function renderMovieBox(movie) {
    const box = document.createElement("div");
    box.className = "box";
    box.dataset.movieId = movie.id;

    const poster = document.createElement("img");
    poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    poster.alt = movie.title;

    const title = document.createElement("div");
    title.className = "movie-title";
    title.textContent = movie.title;

    const rating = document.createElement("div");
    rating.className = "movie-rating";
    rating.textContent = `⭐ ${movie.vote_average}`;

    const releaseDate = document.createElement("div");
    releaseDate.className = "movie-release-date";
    releaseDate.textContent = `개봉일: ${movie.release_date}`;

    const info = document.createElement("div");
    info.className = "info";
    info.innerHTML = `
        <h3>${movie.title}</h3>
        <p>${truncateText(movie.overview, 300)}</p>
        <p>⭐️ ${movie.vote_average} (${movie.vote_count}명 참여)</p>
        <p>개봉일: ${movie.release_date}</p>
    `;

    box.appendChild(poster);
    box.appendChild(title);
    box.appendChild(rating);
    box.appendChild(releaseDate);
    box.appendChild(info);
    eventBox.appendChild(box);
}
    //스크롤
  function handleScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      fetchMovies();
    }
  }

  //카테고리별로 나누기
  function changeCategory(category) {
    currentCategory = category;
    page = 1;
    eventBox.innerHTML = "";

    // 모든 메뉴 아이템에서 active 클래스 제거
    document.querySelectorAll(".menu-item").forEach((item) => {
      item.classList.remove("active");
    });

    // 클릭된 메뉴 아이템에 active 클래스 추가
    let className;
    switch (category) {
      case "top_rated":
        className = "topRated";
        break;
      case "upcoming":
        className = "upComing";
        break;
      case "now_playing":
        className = "nowPlaying";
        break;
    }
    document.querySelector(`.${className}`).classList.add("active");

    fetchMovies();
  }

  //영화 상세 페이지(모달)로 넘어가기
  function fetchMovieDetails(movieId) {
    const movieUrl = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=ko-KR`;
    const videoUrl = `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}&language=ko-KR`;

    Promise.all([
      fetch(movieUrl).then((response) => response.json()),
      fetch(videoUrl).then((response) => response.json()),
    ])
      .then(([movieData, videoData]) => {
        console.log("Movie Details:", movieData);
        console.log("Video Data:", videoData);
        showMovieModal(movieData, videoData);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }

  //모달 생성하기
  function showMovieModal(movieData, videoData) {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.innerHTML = ''; // 기존 모달 제거

    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // backdrop 이미지 설정
    if (movieData.backdrop_path) {
        modalContent.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`;
    } else {
        modalContent.style.backgroundColor = '#333';
    }
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-modal';
    closeButton.innerHTML = '&times;'; // X 문자
    
    const innerContent = document.createElement('div');
    innerContent.className = 'modal-inner-content';
    
    const genres = movieData.genres.map(genre => genre.name).join(', ');
    const countries = movieData.production_countries.map(country => country.name).join(', ');
    const companies = movieData.production_companies.map(company => company.name).join(', ');
    
    let videoHtml = '';
    if (videoData.results && videoData.results.length > 0) {
        const video = videoData.results[0]; // 첫 번째 비디오 사용
        videoHtml = `
            <h3>트레일러</h3>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.key}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        `;
    }
    
    innerContent.innerHTML = `
        <h2>${movieData.title}</h2>
        <p><strong>개요:</strong> ${movieData.overview || '정보 없음'}</p>
        <p><strong>장르:</strong> ${genres}</p>
        <p><strong>국가:</strong> ${countries || '정보 없음'}</p>
        <p><strong>상영시간:</strong> ${movieData.runtime}분</p>
        <p><strong>제작사:</strong> ${companies || '정보 없음'}</p>
        ${videoHtml}
    `;
    
    modalContent.appendChild(closeButton);
    modalContent.appendChild(innerContent);
    modal.appendChild(modalContent);
    modalContainer.appendChild(modal);
    
    closeButton.addEventListener('click', () => {
        modalContainer.innerHTML = ''; // 모달 제거
    });
}

  // 카테고리 변경 이벤트 리스너 추가
  document
    .querySelector(".topRated")
    .addEventListener("click", () => changeCategory("top_rated"));
  document
    .querySelector(".upComing")
    .addEventListener("click", () => changeCategory("upcoming"));
  document
    .querySelector(".nowPlaying")
    .addEventListener("click", () => changeCategory("now_playing"));

  // 영화 상세 정보 모달 이벤트 리스너
  eventBox.addEventListener("click", function (e) {
    const box = e.target.closest(".box");
    if (box) {
      const movieId = box.dataset.movieId;
      if (movieId) {
        fetchMovieDetails(movieId);
      }
    }
  });

  window.addEventListener("scroll", handleScroll);


  // 초기 로딩 (현재 상영중인 영화로 변경)
  changeCategory('now_playing');
  fetchMovies();

});
