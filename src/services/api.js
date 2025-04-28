const API_key = "a3f28e80eb1e160a1434628b3011576a";
const Base_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${Base_URL}/movie/popular?&api_key=${API_key}`);
  const data = await response.json();
  console.log(data);

  return data.results;
};
export const SearchMovies = async (query) => {
  const response = await fetch(
    `${Base_URL}/search/movie?&api_key=${API_key}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};
