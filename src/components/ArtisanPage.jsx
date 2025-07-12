import React, { useState } from 'react';
import './ArtisanPage.css';

const ArtisanPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [sortBy, setSortBy] = useState('alphabetically');
  // Dummy artisan data
  const artisans = [
    {
      id: 1,
      name: "John Smith",
      clusterId: "A1",
      photo: "https://www.w3schools.com/howto/img_avatar.png",
      rating: 4.5,
      skills: ["Pottery", "Ceramics"],
      yearsOfExperience: 10
    },
    {
      id: 2,
      name: "Jane Doe",
      clusterId: "B2",
      photo: "https://www.w3schools.com/howto/img_avatar.png",
      rating: 4.8,
      skills: ["Woodworking", "Carving"],
      yearsOfExperience: 8
    },
    {
      id: 3,
      name: "Bob Johnson",
      clusterId: "C3",
      photo: "https://www.w3schools.com/howto/img_avatar.png",
      rating: 4.2,
      skills: ["Jewelry", "Metalwork"],
      yearsOfExperience: 15
    }
  ];

  // Simple star rating function
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i}>
          {i <= rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  // Filter artisans based on search term and search type
  const filteredArtisans = artisans.filter(artisan => {
    if (searchType === 'name') {
      return artisan.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchType === 'cluster') {
      return artisan.clusterId.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  // Sort artisans based on selected sort option
  const sortedArtisans = [...filteredArtisans].sort((a, b) => {
    if (sortBy === 'alphabetically') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'rating') {
      return b.rating - a.rating; // Sort by rating (highest first)
    } else if (sortBy === 'experience') {
      return b.yearsOfExperience - a.yearsOfExperience; // Sort by experience (highest first)
    }
    return 0;
  });

  return (
    <div>
      <h1>Artisans</h1>
      
      {/* Search input field and dropdown */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            minWidth: '150px'
          }}
        >
          <option value="name">Search by Name</option>
          <option value="cluster">Search by Cluster</option>
        </select>
        
        <input
          type="text"
          placeholder={searchType === 'name' ? 'Search artisans by name...' : 'Search artisans by cluster...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        
        <label style={{ fontSize: '16px', fontWeight: 'bold' }}>Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            minWidth: '180px'
          }}
        >
          <option value="alphabetically">Alphabetically</option>
          <option value="rating">Rating</option>
          <option value="experience">Years of Experience</option>
        </select>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {sortedArtisans.map(artisan => (
          <div key={artisan.id} className="artisan-card">
            <div className="artisan-photo-container">
              <img 
                src={artisan.photo} 
                alt={artisan.name}
                className="artisan-photo"
              />
            </div>
            
            <div>
              <h3>{artisan.name}</h3>
              
              <div>
                <span>{artisan.rating}</span>
                <span>{renderStars(Math.floor(artisan.rating))}</span>
              </div>
              
              <div>
                <strong>Cluster:</strong> Cluster-{artisan.clusterId}
              </div>
              
              <div>
                <strong>Skills:</strong> {artisan.skills.join(', ')}
              </div>
              
              <div>
                <strong>Experience:</strong> {artisan.yearsOfExperience} years
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtisanPage;
