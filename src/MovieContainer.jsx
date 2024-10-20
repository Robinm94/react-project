function MovieContainer({ movie, isLargeRow }) {
  return (
    <img
      key={movie.id}
      className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
      //   onClick={async () => {
      //     await handleClick(movie);
      //   }}
      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
      alt={movie?.title || movie?.name || movie?.original_name}
    />
  );
}

export default MovieContainer;
