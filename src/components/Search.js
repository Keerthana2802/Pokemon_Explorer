import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  types,
}) => {
  const handleSearch = () => {
    console.log("Searching for:", searchTerm, "in type:", selectedType);
  };

  return (
    <div className="search-filter">
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">All</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={handleSearch}>
        <FaSearch color="white" />
      </button>
    </div>
  );
};

export default Search;
