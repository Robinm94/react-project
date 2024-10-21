// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { MovieContext } from "./Contexts";
import MovieContainer from "./MovieContainer";
import requests from "./requests";
import fetchMoviesList from "./fetchMoviesListAndData";
import "./Row.css";
import MovieTrailer from "./MovieTrailer";

function Row({ title, requestName, isLargeRow }) {
  // const movieHook = useState();
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
      {/* <MovieContext.Provider value={movieHook}> */}
      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <MovieContainer
              key={movie.id}
              movie={movie}
              requestName={requestName}
              isLargeRow={isLargeRow}
            />
          );
        })}
      </div>
      <MovieTrailer requestName={requestName} />
      {/* </MovieContext.Provider> */}
    </div>
  );
}

export default Row;
