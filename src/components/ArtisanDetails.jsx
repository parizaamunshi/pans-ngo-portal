import React from 'react';

function ArtisanDetails({ artisan }) {
  return (
    <div className="artisan-details" style={{ border: '1px solid #aaa', borderRadius: 6, padding: '1rem', margin: '1rem 0' }}>
      <h3>{artisan.artisian_name} (ID: {artisan.artisian_id})</h3>
      <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: 400 }}>
        <li><strong>Rating:</strong> {artisan.artisian_rating}</li>
        <li><strong>Total Orders:</strong> {artisan.total_orders}</li>
        <li><strong>Total Revenue:</strong> ₹{artisan.total_revenue}</li>
        <li><strong>Current Order:</strong> {artisan.current_order}</li>
        <li><strong>Amount to be Paid:</strong> ₹{artisan.amount_to_be_paid}</li>
        <li><strong>Skills:</strong> {artisan.skills.join(', ')}</li>
      </ul>
    </div>
  );
}

export default ArtisanDetails;
