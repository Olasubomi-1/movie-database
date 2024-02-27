const apiKey = "5e15479be6ea030e9552e962de39ff1a";

// Function to get movies by genre
function getMoviesByGenre(genreId) {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
  )
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      displayMovies(movies);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Function to search movies
function searchMovies() {
  const searchQuery = document.getElementById("searchInput").value;

  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
  )
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      displayMovies(movies);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Function to display movies
function displayMovies(movies) {
  const movieResultsDiv = document.getElementById("movieResults");
  movieResultsDiv.innerHTML = "";

  movies.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");
    movieDiv.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <div class="movie-details">
                <h2 class="title">${movie.title}</h2>
                <p>Release Date: ${movie.release_date}</p>
                <p>Rating: ${movie.vote_average}</p>
            </div>
        `;
    movieResultsDiv.appendChild(movieDiv);
  });
}

// Function to get the most popular movie at the moment (hero movie)
function getHeroMovie() {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`
  )
    .then((response) => response.json())
    .then((data) => {
      const heroMovie = data.results[0];
      const heroSection = document.getElementById("heroSection");
      heroSection.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500/${heroMovie.poster_path}" alt="${heroMovie.title}">
                <div class="hero-details">
                    <h2>Most Popular Movie</h2>
                    <p>${heroMovie.title}</p>
                    <p>Release Date: ${heroMovie.release_date}</p>
                    <p>Rating: ${heroMovie.vote_average}</p>
                </div>
            `;
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Call the function to get the hero movie when the page loads
getHeroMovie();
