import Row from "./RowContainer";
import { MovieContext } from "./Contexts";
import { useState } from "react";

function RowSection() {
  const movieHook = useState();
  return (
    <MovieContext.Provider value={movieHook}>
      <Row title="Trending Now" requestName="fetchTrending" isLargeRow />
      <Row title="Top Rated" requestName="fetchTopRated" />
      <Row title="Netflix Originals" requestName="fetchNetflixOriginals" />
      <Row title="Disney+ Originals" requestName="fetchDisneyPlusOriginals" />
      <Row title="AppleTV Originals" requestName="fetchAppleTVOriginals" />
      <Row title="Action Movies" requestName="fetchActionMovies" />
      <Row title="Comedy Movies" requestName="fetchComedyMovies" />
      <Row title="Horror Movies" requestName="fetchHorrorMovies" />
      <Row title="Romance Movies" requestName="fetchRomanceMovies" />
      <Row title="Documentaries" requestName="fetchDocumentaries" />
    </MovieContext.Provider>
  );
}

export default RowSection;
