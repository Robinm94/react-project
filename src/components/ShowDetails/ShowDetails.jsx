import { useQuery } from "@tanstack/react-query";
import { useParams, Navigate } from "react-router-dom";
import fetchShowDetails from "../../services/fetchShowDetails";
import YouTube from "react-youtube";
import getTrailer from "../../services/getTrailerKey";
import "./ShowDetails.css";

function ShowDetails() {
  const { showtype, showid } = useParams();
  if (showtype !== "movie" && showtype !== "tv") {
    return <Navigate to="/" />;
  }
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
      rel: 0,
    },
  };

  const { isLoading, data: showDetails } = useQuery({
    queryKey: [`showDetails_${showtype}_${showid}`, showtype, showid],
    queryFn: async () => {
      let showDetails = await fetchShowDetails(showtype, showid);
      if (!showDetails || showDetails["adult"]) {
        return null;
      } else if (showDetails["media_type"] == undefined) {
        showDetails["media_type"] = showtype;
      }
      const trailerUrl = await getTrailer(showDetails);
      showDetails.trailerUrl = trailerUrl;
      return showDetails;
    },
  });

  if (isLoading || !showDetails || showDetails["adult"]) {
    return null;
  }

  function focus() {
    document.getElementById("youtube_trailer_container_details").focus();
  }

  return (
    <div className="showDetails">
      <img
        src={`https://image.tmdb.org/t/p/original/${showDetails?.backdrop_path}`}
        className="moviedetails__banner"
        alt={`${
          showDetails?.title || showDetails?.name || showDetails?.original_name
        } banner`}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      />
      <div className="youtube_trailer_container_details">
        <div id="youtube_trailer_container_details" tabIndex={0}>
          <YouTube
            videoId={showDetails.trailerUrl}
            opts={opts}
            onReady={focus}
          />
        </div>
      </div>
      <div className="moviedetails__contents" role="main">
        <div className="moviedetails__top">
          <h1 className="moviedetails__title">
            {showDetails?.title ||
              showDetails?.name ||
              showDetails?.original_name}
          </h1>
          <h1 className="moviedetails__description">{showDetails?.overview}</h1>
        </div>
        <div className="moviedetails__bottom">
          {showDetails?.vote_average ? (
            <div className="moviedetails__rating">
              <h1>Rating: {showDetails?.vote_average}</h1>
            </div>
          ) : null}
          {showDetails?.release_date ? (
            <div className="moviedetails__release">
              <h1>Release Date: {showDetails?.release_date}</h1>
            </div>
          ) : null}
          {showDetails?.first_air_date ? (
            <div className="moviedetails__firstair">
              <h1>First Air Date: {showDetails?.first_air_date}</h1>
            </div>
          ) : null}
          {showDetails?.last_air_date ? (
            <div className="moviedetails__lastair">
              <h1>Last Air Date: {showDetails?.last_air_date}</h1>
            </div>
          ) : null}
          {showDetails?.runtime ? (
            <div className="moviedetails__runtime">
              <h1>Runtime: {showDetails?.runtime} minutes</h1>
            </div>
          ) : null}
          {showDetails?.genres ? (
            <div className="moviedetails__genres">
              <h1>
                Genres:{" "}
                {showDetails?.genres.map((genre) => genre.name).join(", ")}
              </h1>
            </div>
          ) : null}
          {showDetails?.number_of_seasons ? (
            <div className="moviedetails__seasons">
              <h1>Seasons: {showDetails?.number_of_seasons}</h1>
            </div>
          ) : null}
          {showDetails?.number_of_episodes ? (
            <div className="moviedetails__episodes">
              <h1>Episodes: {showDetails?.number_of_episodes}</h1>
            </div>
          ) : null}
          {showDetails?.status ? (
            <div className="moviedetails__status">
              <h1>Status: {showDetails?.status}</h1>
            </div>
          ) : null}
          {showDetails?.Production_Companies ? (
            <div className="moviedetails__production">
              <h1>
                Production Companies:{" "}
                {showDetails?.production_companies
                  .map((company) => company.name)
                  .join(", ")}
              </h1>
            </div>
          ) : null}

          {showDetails?.reviews?.results?.length > 0 ? (
            <div className="moviedetails__reviews">
              <h1>Reviews:</h1>
              {showDetails?.reviews?.results.map((review) => {
                return (
                  <div key={review.id} className="moviedetails__review">
                    {/* <h1>{review.author}</h1>
                    <h1>{review.content}</h1> */}
                    <p className="review__content">
                      <cite>{review.content}</cite>
                    </p>
                    <p className="review__author">
                      <strong>- {review.author}</strong>
                    </p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ShowDetails;
