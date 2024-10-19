import axiosInstance from "./axiosCreator";

export default async function fetchMoviesList(requestUrl) {
  const response = await axiosInstance.get(requestUrl);
  return response.data;
}
