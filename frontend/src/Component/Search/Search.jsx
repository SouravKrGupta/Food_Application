import React, { useState } from 'react';
import './Search.css';
import { assets } from '../../assets/assets';
const Search = ({ setSearchQuery }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setSearchQuery(value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name or category..."
        value={query}
        onChange={handleSearch}
        className="search-input"
      />
              <img src={assets.search_icon} alt='' />
    </div>
  );
};

export default Search;
