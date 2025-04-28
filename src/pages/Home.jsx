import React, { useState, useEffect } from "react";
import { FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getPopularMovies, SearchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null); // State to hold error message
  const toggleFavorite = (movie) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);

    if (isAlreadyFavorite) {
      favorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      favorites.push(movie);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return; // Prevent empty search
    setLoading(true); // Prevent empty search
    try {
      const searchResult = await SearchMovies(searchQuery);
      setMovies(searchResult);
      setError(null); // Reset error state on successful search
    } catch (err) {
      console.log(err);

      setError("Failed to fetch movies:");
    } finally {
      setLoading(false);
    }
    // setSearchQuery(""); // ✅ Use the setter function
  };
  return (
    <div className="min-w-screen flex justify-center item-center mt-15 md:mt-20 md:justify-center">
      <div className=" w-full p-4 md:p-10">
        <form
          onSubmit={handleSearch}
          className="flex w-full justify-center items-center gap-2 mb-5"
        >
          <input
            type="text"
            className="bg-[#1a1a1a] text-white placeholder-gray-500 border border-gray-700 rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 md:w-1/2"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <h1 className="flex items-center gap-2 text-sm">
          <FaFire className="text-red-500 text-xl" />
          Trending Movies
          <span className="h-px w-2/4 bg-[#1a1a1a] md:w-3/4"></span>
          {/* <Link to="/favorite" className="text-[#9ca3af]">
            see more
          </Link> */}
        </h1>
        {loading ? (
          <div className="text-center mt-20">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  mt-5 md:gap-0">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
