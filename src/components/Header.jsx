import React from "react";
import { NavLink } from "react-router-dom";
import { RiMenu5Fill } from "react-icons/ri";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  console.log(isOpen);

  return (
    <div className=" w-full fixed z-50 flex  justify-center bg-[#0f0f0f] ">
      <div className="  container flex justify-between items-center p-5 md:flex md:justify-between ">
        <h1 className=" font-bold text-blue-500">Movie App</h1>
        <nav>
          <ul className="  gap-4 hidden md:flex">
            <NavLink
              to="/"
              className="text-gray-400 hover:text-blue-500 transition duration-300 transform hover:scale-105"
            >
              Home
            </NavLink>
            <NavLink
              to="/favorite"
              className="text-gray-400 hover:text-blue-500 transition duration-300 transform hover:scale-105"
            >
              Favorite
            </NavLink>
          </ul>
        </nav>

        <button className=" md:hidden" onClick={handleToggle}>
          <RiMenu5Fill className=" text-2xl cursor-pointer text-blue-500 md:hidden" />
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-16 right-4 bg-[#1a1a1a] text-black p-4 shadow-lg rounded-lg md:hidden"
        >
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink
                className="text-[#9ca3af]"
                to="/"
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                className="text-[#9ca3af]"
                to="/favorite"
                onClick={() => setIsOpen(false)}
              >
                Favorite
              </NavLink>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
}
