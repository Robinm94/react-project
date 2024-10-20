import { useQuery } from "@tanstack/react-query";
// import { SliderContext } from "./SliderContext";
import MovieContainer from "./MovieContainer";
import requests from "./requests";
import fetchMoviesList from "./fetchMoviesListAndData";
import "./Row.css";

function Row({ title, requestName, isLargeRow }) {
  const { isLoading, data: moviesList } = useQuery({
    queryKey: [requestName, requests[requestName]],
    queryFn: () => fetchMoviesList(requests[requestName]),
  });

  if (isLoading) {
    return (
      <div className="row">
        <div className="row__posters">
          <h2></h2>
        </div>
      </div>
    );
  }
  const movies = moviesList.results.filter(
    (movie) => movie.poster_path !== null,
  );

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <MovieContainer
              key={movie.id}
              movie={movie}
              isLargeRow={isLargeRow}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Row;
