const requests = {
  // fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  // fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  // fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  // fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  // fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  // fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  // fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  // fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchTrending: `/trending/all/week?language=en-US`,
  fetchNetflixOriginals: `/discover/tv?with_networks=213&with_original_language=en&sort_by=popularity.desc`,
  fetchDisneyPlusOriginals: `/discover/tv?with_networks=2739&with_original_language=en&sort_by=popularity.desc`,
  fetchAppleTVOriginals: `/discover/tv?with_networks=2552&with_original_language=en&sort_by=popularity.desc`,
  fetchTopRated: `/movie/top_rated?language=en-US`,
  fetchActionMovies: `/discover/movie?with_genres=28&with_original_language=en&sort_by=popularity.desc`,
  fetchComedyMovies: `/discover/movie?with_genres=35&with_original_language=en&sort_by=popularity.desc`,
  fetchHorrorMovies: `/discover/movie?with_genres=27&with_original_language=en&sort_by=popularity.desc`,
  fetchRomanceMovies: `/discover/movie?with_genres=10749&with_original_language=en&sort_by=popularity.desc`,
  fetchDocumentaries: `/discover/movie?with_genres=99&with_original_language=en&sort_by=popularity.desc&include_adult=false`,
  fetchAnimations: `/discover/tv?with_genres=16&sort_by=popularity.desc`,
};

export default requests;
