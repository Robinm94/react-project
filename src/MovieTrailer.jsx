import { useQuery } from "@tanstack/react-query";
import { MovieContext } from "./Contexts";
import { useContext } from "react";
import movieTrailer from "movie-trailer";
import axios from "./axiosCreator";
import YouTube from "react-youtube";
import "./MovieTrailer.css";

function MovieTrailer({ requestName }) {
  const [movie] = useContext(MovieContext);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
      rel: 0,
    },
  };
  async function movieTrailerSearch(movie, options, tempTrailerUrl) {
    await movieTrailer(
      movie?.title || movie?.name || movie?.original_name,
      options,
    )
      .then((url) => {
        if (url === null) {
          throw new Error("No trailer found");
        }
        const urlParams = new URLSearchParams(new URL(url).search);
        tempTrailerUrl = urlParams.get("v");
      })
      .catch((error) => console.log(error.message));
    return tempTrailerUrl;
  }

  async function getTrailer(movie) {
    if (!movie) {
      return "";
    }
    let tempTrailerUrl = "";

    let trailerurlRequest;
    trailerurlRequest = await axios
      .get(`/movie/${movie.id}/videos`)
      .catch((error) => console.log(error.message));
    if (trailerurlRequest?.data?.results?.length === 0) {
      trailerurlRequest = await axios
        .get(`/tv/${movie.id}/videos`)
        .catch((error) => console.log(error.message));
    }

    if (trailerurlRequest?.data?.results?.length > 0) {
      tempTrailerUrl = trailerurlRequest.data.results.filter(
        (x) => x.type === "Trailer" && x.site === "YouTube",
      )[0]?.key;
    } else {
      let options = {};
      options.tmdbId = movie.id;
      tempTrailerUrl = await movieTrailerSearch(movie, options, tempTrailerUrl);
      if (tempTrailerUrl === "") {
        options.videoType = "tv";
        tempTrailerUrl = await movieTrailerSearch(
          movie,
          options,
          tempTrailerUrl,
        );
      }
    }

    return tempTrailerUrl;
  }

  const { isFetched: isFetched, data: trailerUrl } = useQuery({
    queryKey: [`trailerKey_${movie?.id}`, movie],
    queryFn: () => getTrailer(movie),
    enabled: !!movie && movie.requestName == requestName,
  });

  if (!isFetched) {
    return null;
  }

  if (!movie || movie.requestName != requestName) {
    return null;
  }

  function focus() {
    document.getElementById("youtube_trailer_container").focus();
  }

  return (
    <div
      id="youtube_trailer_container"
      className="youtube_trailer_container"
      tabIndex={0}
    >
      <YouTube videoId={trailerUrl} opts={opts} onReady={focus} />
    </div>
  );
}

export default MovieTrailer;
