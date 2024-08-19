document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "f21ecfa7ce04ed1c5ddf3919ba7a8278";
    const baseUrl = "https://api.themoviedb.org/3";
    const eventBox = document.querySelector('.eventBox');
    let page = 1;
    let isLoading = false;
    let currentCategory = 'top_rated';

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }
    
    function fetchMovies() {
        if (isLoading) return;
        isLoading = true;
    
        let url;
        switch(currentCategory) {
            case 'top_rated':
                url = `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=ko-KR&page=${page}`;
                break;
            case 'upcoming':
                url = `${baseUrl}/movie/upcoming?api_key=${apiKey}&language=ko-KR&page=${page}`;
                break;
            case 'now_playing':
                url = `${baseUrl}/movie/now_playing?api_key=${apiKey}&language=ko-KR&page=${page}`;
                break;
            default:
                url = `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=ko-KR&page=${page}`;
        }
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched Data:", data);
    
                data.results.forEach(movie => {
                    renderMovieBox(movie);
                });
                page++;
                isLoading = false;
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
                isLoading = false;
            });
    }

    function renderMovieBox(movie) {
        const box = document.createElement('div');
        box.className = 'box';
        box.dataset.movieId = movie.id;

        const poster = document.createElement('img');
        poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        poster.alt = movie.title;

        const truncatedOverview = truncateText(movie.overview, 200);

        const info = document.createElement('div');
        info.className = 'info';
        info.innerHTML = `
            <h3>${movie.title}</h3>
            <p>${truncatedOverview}</p>
            <p>평점: ${movie.vote_average} (${movie.vote_count}명 참여)</p>
            <p>개봉일: ${movie.release_date}</p>
        `;

        box.appendChild(poster);
        box.appendChild(info);
        eventBox.appendChild(box);
    }

    function handleScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            fetchMovies();
        }
    }

    function changeCategory(category) {
        currentCategory = category;
        page = 1;
        eventBox.innerHTML = '';
        fetchMovies();
    }

    function fetchMovieDetails(movieId) {
        const url = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=ko-KR`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("Movie Details:", data);
                showMovieModal(data);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    }

    function showMovieModal(movieData) {
        const modalContainer = document.getElementById('modalContainer');
        modalContainer.innerHTML = ''; // 기존 모달 제거

        const modal = document.createElement('div');
        modal.className = 'modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const genres = movieData.genres.map(genre => genre.name).join(', ');
        const countries = movieData.production_countries.map(country => country.name).join(', ');
        const companies = movieData.production_companies.map(company => company.name).join(', ');
        
        modalContent.innerHTML = `
            <h2>${movieData.title}</h2>
            <p><strong>장르:</strong> ${genres}</p>
            <p><strong>국가:</strong> ${countries || '정보 없음'}</p>
            <p><strong>상영시간:</strong> ${movieData.runtime}분</p>
            <p><strong>제작사:</strong> ${companies || '정보 없음'}</p>
            <button class="close-modal">닫기</button>
        `;
        
        modal.appendChild(modalContent);
        modalContainer.appendChild(modal);
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modalContainer.innerHTML = ''; // 모달 제거
        });
    }

    // 카테고리 변경 이벤트 리스너 추가
    document.querySelector('.topRated').addEventListener('click', () => changeCategory('top_rated'));
    document.querySelector('.upComing').addEventListener('click', () => changeCategory('upcoming'));
    document.querySelector('.nowPlaying').addEventListener('click', () => changeCategory('now_playing'));

    // 영화 상세 정보 모달 이벤트 리스너
    eventBox.addEventListener('click', function(e) {
        const box = e.target.closest('.box');
        if (box) {
            const movieId = box.dataset.movieId;
            if (movieId) {
                fetchMovieDetails(movieId);
            }
        }
    });

    window.addEventListener('scroll', handleScroll);

    // 초기 로딩
    fetchMovies();
});