import axiosInstance from "./axiosCreator";

export default async function fetchMovieDetails(showType, showId) {
  const requestUrl = `/${showType}/${showId}?append_to_response=reviews&language=en-US'`;
  const response = await axiosInstance
    .get(requestUrl)
    .catch((error) => console.log(error.message));
  return response.data;
}
