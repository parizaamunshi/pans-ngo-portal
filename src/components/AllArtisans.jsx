import React from 'react';

function AllArtisans({ artisans }) {
  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', textAlign: 'center' }}>
      <h2>All Artisans Details</h2>
      {artisans && artisans.length > 0 ? (
        artisans.map((artisan, idx) => (
          <div key={idx} style={{ border: '1px solid #aaa', borderRadius: 6, padding: '1rem', margin: '1rem 0' }}>
            <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: 400 }}>
              <li><strong>Artisian ID:</strong> {artisan.artisian_id}</li>
              <li><strong>Artisian Name:</strong> {artisan.artisian_name}</li>
              <li><strong>Artisian Rating:</strong> {artisan.artisian_rating}</li>
              <li><strong>Total Orders:</strong> {artisan.total_orders}</li>
              <li><strong>Total Revenue:</strong> ₹{artisan.total_revenue}</li>
              <li><strong>Current Order:</strong> {artisan.current_order}</li>
              <li><strong>Amount to be Paid:</strong> ₹{artisan.amount_to_be_paid}</li>
              <li><strong>Skills:</strong> {artisan.skills.join(', ')}</li>
            </ul>
          </div>
        ))
      ) : (
        <p>No artisans found.</p>
      )}
    </div>
  );
}

export default AllArtisans;
