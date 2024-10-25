import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { MovieContext } from "./Contexts";
import { useContext } from "react";
import getTrailer from "./getTrailerKey";
import YouTube from "react-youtube";
import "./MovieTrailer.css";

function MovieTrailer({ requestName }) {
  const [movie, setMovie] = useContext(MovieContext);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
      rel: 0,
    },
  };

  const { isFetched: isFetched, data: trailerUrl } = useQuery({
    queryKey: [`trailerKey_${movie?.id}`, movie],
    queryFn: async () => await getTrailer(movie),
    enabled: !!movie && movie.requestName == requestName,
  });

  if (!isFetched) {
    return null;
  }

  if (!movie || movie.requestName != requestName) {
    return null;
  }

  function focus() {
    document.getElementById("youtube_trailer").focus();
  }

  return (
    <div className="youtube_trailer_container">
      <div className="youtube_trailer_buttons">
        <Link to={`/${movie.media_type}/${movie.id}`}>
          <div className="more_details_button">More details</div>
        </Link>
        <div className="close_trailer_button" onClick={() => setMovie()}>
          Close trailer
        </div>
      </div>
      <div id="youtube_trailer" tabIndex={0}>
        <YouTube videoId={trailerUrl} opts={opts} onReady={focus} />
      </div>
    </div>
  );
}

export default MovieTrailer;
