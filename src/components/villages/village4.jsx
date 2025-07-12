import React, { useState } from 'react';
import './Village1.css';

const Village1 = () => {
  const artisanList = [
    { name: "Artisan 1", rating: 4.2 },
    { name: "Artisan 2", rating: 3.8 },
    { name: "Artisan 3", rating: 4.9 },
    { name: "Artisan 4", rating: 4.5 },
    { name: "Artisan 5", rating: 3.3 },
  ];

  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => setSearch(e.target.value);

  const filteredArtisans = artisanList
    .filter((artisan) =>
      artisan.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.rating - a.rating); // descending order by rating

  return (
    <div className="village-wrapper">
      <h1 className="village-title">Village 1</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search artisan..."
          value={search}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>

      <ul className="artisan-list">
        {filteredArtisans.map((artisan, index) => (
          <li key={index} className="artisan-card">
            <h3>{artisan.name}</h3>
            <p>⭐ Rating: <strong>{artisan.rating}</strong></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Village1;

