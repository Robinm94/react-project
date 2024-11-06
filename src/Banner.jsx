import { useQuery } from "@tanstack/react-query";
import fetchMoviesList from "./fetchMoviesListAndData";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const { isLoading, data: moviesList } = useQuery({
    queryKey: ["fetchTrending", requests.fetchTrending],
    queryFn: async () => await fetchMoviesList(requests.fetchTrending),
  });
  if (isLoading) {
    return <header className="banner"></header>;
  }
  const filteredRequest = moviesList.results.filter(
    (movie) =>
      movie != null && movie.backdrop_path !== null && movie.overview !== "",
  );
  const movie =
    filteredRequest[Math.floor(Math.random() * (filteredRequest.length - 1))];

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"),url("https://image.tmdb.org/t/p/w1280/${movie?.backdrop_path}")`,
        backgroundPosition: "center center,center center",
        backgroundRepeat: "no-repeat,no-repeat",
      }}
    >
      <div className="banner__contents" role="main">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div> */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
    </header>
  );
}

export default Banner;
