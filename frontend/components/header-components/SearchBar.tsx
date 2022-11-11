import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

const SearchBar = () => {
  return (
    <form
      className="flex flex-1 h-10 items-center space-x-2 rounded-xl border
 border-b-gray-200 bg-gray-100 px-3 py-1 min-w-[165px]  xl:max-w-6xl"
    >
      <SearchIcon className="w-5 h-5 text-gray-400" />
      <input
        className="flex-1 bg-transparent outline-none min-w-[80px]"
        type="text"
        placeholder="Search Replicaz"
      />
      <button type="submit" hidden />
    </form>
  );
};

export default SearchBar;
