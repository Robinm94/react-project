import movieTrailer from "movie-trailer";
import axios from "./axiosCreator";

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
  let options = {};
  options.tmdbId = movie.id;
  if (movie.media_type === "tv") {
    trailerurlRequest = await axios
      .get(`/tv/${movie.id}/videos`)
      .catch((error) => console.log(error.message));
    if (trailerurlRequest?.data?.results?.length > 0) {
      tempTrailerUrl = trailerurlRequest.data.results.filter(
        (x) => x.type === "Trailer" && x.site === "YouTube",
      )[0]?.key;
    }
    if (trailerurlRequest?.data?.results?.length === 0 || !tempTrailerUrl) {
      options.videoType = "tv";
      tempTrailerUrl = await movieTrailerSearch(movie, options, tempTrailerUrl);
    }

    return tempTrailerUrl;
  } else if (movie.media_type === "movie") {
    trailerurlRequest = await axios
      .get(`/movie/${movie.id}/videos`)
      .catch((error) => console.log(error.message));
    if (trailerurlRequest?.data?.results?.length > 0) {
      tempTrailerUrl = trailerurlRequest.data.results.filter(
        (x) => x.type === "Trailer" && x.site === "YouTube",
      )[0]?.key;
    }
    if (trailerurlRequest?.data?.results?.length === 0 || !tempTrailerUrl) {
      tempTrailerUrl = await movieTrailerSearch(movie, options, tempTrailerUrl);
    }
    return tempTrailerUrl;
  } else {
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
}

export default getTrailer;
