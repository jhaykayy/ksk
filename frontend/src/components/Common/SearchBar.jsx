import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search Term:", searchTerm);
    setIsOpen(false);
  };

  return (
    <div
      className={`
        flex
        w-full
        transition-all
        items-center justify-center duration-300
        ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}
      `}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="
            flex
            w-full
            relative items-center justify-center
          "
        >
          <div
            className="
              w-1/2
              relative
            "
          >
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full
                px-4 py-2 pl-2 pr-12
                bg-gray-100
                rounded-lg
                focus:outline-none placeholder:text-gray-700
              "
            ></input>

            {/* search icon */}
            <button
              type="submit"
              className="
                text-gray-600
                absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-gray:800
              "
            >
              <HiMagnifyingGlass
                className="
                  h-6 w-6
                "
              />
            </button>
          </div>

          {/* Close button */}

          <button
            type="button"
            onClick={handleSearchToggle}
            className="
              text-gray-600
              absolute right-4 top-1/2 transform -translate-y-1/2 hover:text-gray:800
            "
          >
            <HiMiniXMark
              className="
                h-6 w-6
              "
            />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass
            className="
              h-6 w-6
            "
          />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
