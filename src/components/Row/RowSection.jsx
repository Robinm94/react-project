import Row from "./RowContainer";
import { MovieContext } from "../../contexts/Contexts";
import { useState } from "react";

function RowSection() {
  const movieHook = useState();
  return (
    <MovieContext.Provider value={movieHook}>
      <Row title="Trending Now" requestName="fetchTrending" isLargeRow />
      <Row title="Top Rated" requestName="fetchTopRated" media_type="movie" />
      <Row
        title="Netflix Originals"
        requestName="fetchNetflixOriginals"
        media_type="tv"
      />
      <Row
        title="Disney+ Originals"
        requestName="fetchDisneyPlusOriginals"
        media_type="tv"
      />
      <Row
        title="AppleTV Originals"
        requestName="fetchAppleTVOriginals"
        media_type="tv"
      />
      <Row
        title="Action Movies"
        requestName="fetchActionMovies"
        media_type="movie"
      />
      <Row
        title="Comedy Movies"
        requestName="fetchComedyMovies"
        media_type="movie"
      />
      <Row
        title="Horror Movies"
        requestName="fetchHorrorMovies"
        media_type="movie"
      />
      <Row
        title="Romance Movies"
        requestName="fetchRomanceMovies"
        media_type="movie"
      />
      <Row
        title="Documentaries"
        requestName="fetchDocumentaries"
        media_type="movie"
      />
    </MovieContext.Provider>
  );
}

export default RowSection;
