import Banner from "./Banner";
import Row from "./RowContainer";

function Home() {
  return (
    <>
      <Banner />
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
    </>
  );
}

export default Home;
