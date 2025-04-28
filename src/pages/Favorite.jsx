import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-400">
        No favorite movies yet.
      </div>
    );
  }

  return (
    <div className="min-w-screen flex flex-col p-4  justify-center item-center md:mt-20 md:justify-center  mt-15">
      <div className=" w-full p-4 md:p-10">
        <h1 className=" flex items-center gap-2 text-sm">
          Favorite movie(s)
          <span className="h-px w-2/4 bg-[#1a1a1a] md:w-3/4"></span>
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4   mt-5 md:gap-0">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
