import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

const SearchBar = () => {
  return (
    <form
      className="flex flex-1 h-10 items-center space-x-2 rounded-xl border
  bg-second px-3 py-1 min-w-[165px]  xl:max-w-6xl"
    >
      <SearchIcon className="w-5 h-5 text-text-third" />
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
