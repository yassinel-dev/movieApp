import React, { useState, useEffect } from "react";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import nosignal from "../assets/nosignal.jpg";
import { motion } from "framer-motion";
function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if this movie is already in favorites
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);
    setIsFavorite(isAlreadyFavorite);
  }, [movie.id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      // Add to favorites
      favorites.push(movie);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite); // update the UI
  };

  return (
    <div className="p-3">
      <div className="bg-gradient-to-br from-[#1f1f1f] to-[#2c2c2c] border border-[#2a2a2a] backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition transform hover:scale-105 hover:shadow-[0_12px_45px_rgba(0,0,0,0.35)] duration-300 ease-in-out group">
        <div className="relative">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : nosignal
            }
            alt="Movie Poster"
            className="w-full h-72 object-cover rounded-t-3xl transition duration-300 group-hover:brightness-75"
          />
          <motion.div
            onClick={toggleFavorite}
            whileTap={{ scale: 1.3 }} // small pop effect
            transition={{ type: "spring", stiffness: 300 }}
            className="absolute top-3 right-3 flex justify-center items-center text-white text-xs px-2 py-2 rounded-full backdrop-blur-md bg-black/50 cursor-pointer hover:bg-white/10 transition"
          >
            {isFavorite ? (
              <MdOutlineFavorite className="text-red-500 text-xl" />
            ) : (
              <MdFavoriteBorder className="text-gray-400 text-xl" />
            )}
          </motion.div>
        </div>

        <div className="p-5 space-y-2">
          <h2 className="text-white text-2xl font-semibold tracking-tight">
            {movie.title}
          </h2>
          <p className="text-sm text-gray-400">📅 {movie.release_date}</p>
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
            {movie.overview || "No overview available for this movie."}
          </p>
          {/* <button className="mt-3 inline-block bg-white/10 text-white text-sm px-4 py-2 rounded-full backdrop-blur-md hover:bg-white/20 transition">
            View Details
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
