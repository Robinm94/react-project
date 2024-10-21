import axiosInstance from "./axiosCreator";

export default async function fetchMoviesList(requestUrl) {
  const response = await axiosInstance
    .get(requestUrl)
    .catch((error) => console.log(error.message));
  return response.data;
}
