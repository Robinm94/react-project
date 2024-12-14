import { useContext } from "react";
import { MovieContext } from "../../contexts/Contexts";

function MovieContainer({ movie, requestName, isLargeRow }) {
  const [, setMovie] = useContext(MovieContext);
  const handleMovieContainerClick = (movie) => {
    movie.requestName = requestName;
    setMovie(movie);
  };
  return (
    <img
      key={movie.id}
      className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
      onClick={() => {
        handleMovieContainerClick(movie);
      }}
      src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
      alt={movie?.title || movie?.name || movie?.original_name}
    />
  );
}

export default MovieContainer;
