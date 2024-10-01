import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/searchSlice";
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search || ""); // Fallback to empty string if undefined

  const handleSearch = (e) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));
  };

  return (
    <div className="mb-6 flex items-center">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pl-10"
        />
        <FaSearch
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
          size={20}
        />
      </div>
    </div>
  );
};

export default SearchBar;
