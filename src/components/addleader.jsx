import React, { useState } from 'react'

const Appleader = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [formData, setFormData] = useState({
    leader_id: '',
    cluster_id: '',
    leader_rating: '',
    cluster_rating: '',
    skills: '',
    years_of_experience: '',
    searchName: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (formType) => {
    console.log(`⁠${formType} form submitted:⁠, formData`);
    // Here you would typically send data to an API
    alert(`${formType} operation completed!`);
    setFormData({ leader_id: '', cluster_id: '', leader_rating: '', cluster_rating: '', skills: '', years_of_experience: '', searchName: '' });
    setActiveForm(null);
  };

  const renderAddForm = () => (
    <div style={{ 
      marginTop: '20px', 
      padding: '30px', 
      backgroundColor: 'white',
      borderRadius: '12px', 
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e0e0e0',
      width: '100%' 
    }}>
      <h3 style={{ color: '#1f2937', marginBottom: '20px', fontSize: '24px' }}>Add New Leader</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#1f2937', fontSize: '16px' }}>Leader ID:</label>
        <input
          type="number"
          name="leader_id"
          value={formData.leader_id}
          onChange={handleInputChange}
          placeholder="Enter leader ID"
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '16px',
            color: '#1f2937'
          }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#1f2937', fontSize: '16px' }}>Cluster ID:</label>
        <input
          type="number"
          name="cluster_id"
          value={formData.cluster_id}
          onChange={handleInputChange}
          placeholder="Enter cluster ID"
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '16px',
            color: '#1f2937'
          }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#1f2937', fontSize: '16px' }}>Leader Rating (1-5):</label>
        <select
          name="leader_rating"
          value={formData.leader_rating}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '16px',
            color: '#1f2937'
          }}
        >
          <option value="">Select leader rating</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#1f2937', fontSize: '16px' }}>Cluster Rating (1-5):</label>
        <select
          name="cluster_rating"
          value={formData.cluster_rating}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '16px',
            color: '#1f2937'
          }}
        >
          <option value="">Select cluster rating</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#1f2937', fontSize: '16px' }}>Skills (comma-separated):</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleInputChange}
          placeholder="e.g., Leadership, Management, Communication"
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '16px',
            color: '#1f2937'
          }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#1f2937', fontSize: '16px' }}>Years of Experience:</label>
        <input
          type="number"
          name="years_of_experience"
          value={formData.years_of_experience}
          onChange={handleInputChange}
          placeholder="Enter years of experience"
          min="0"
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '16px',
            color: '#1f2937'
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => handleFormSubmit('Add Leader')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Add Leader
        </button>
        <button
          onClick={() => setActiveForm(null)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const renderEditForm = () => (
    <div style={{ 
      marginTop: '20px', 
      padding: '30px', 
      backgroundColor: 'white',
      borderRadius: '12px', 
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e0e0e0',
      width: '100%' 
    }}>
      <h3 style={{ color: '#1f2937', marginBottom: '20px', fontSize: '24px' }}>Edit Leader</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#1f2937', fontSize: '16px' }}>Search Leader by ID:</label>
        <input
          type="number"
          name="searchName"
          value={formData.searchName}
          onChange={handleInputChange}
          placeholder="Enter leader ID to edit"
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '16px',
            color: '#1f2937'
          }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#1f2937', fontSize: '16px' }}>New Leader ID:</label>
        <input
          type="number"
          name="leader_id"
          value={formData.leader_id}
          onChange={handleInputChange}
          placeholder="Enter new leader ID (optional)"
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '16px',
            color: '#1f2937'
          }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#1f2937', fontSize: '16px' }}>New Cluster ID:</label>
        <input
          type="number"
          name="cluster_id"
          value={formData.cluster_id}
          onChange={handleInputChange}
          placeholder="Enter new cluster ID (optional)"
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '16px',
            color: '#1f2937'
          }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#1f2937', fontSize: '16px' }}>New Leader Rating (1-5):</label>
        <select
          name="leader_rating"
          value={formData.leader_rating}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '16px',
            color: '#1f2937'
          }}
        >
          <option value="">Select new leader rating (optional)</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#1f2937', fontSize: '16px' }}>New Cluster Rating (1-5):</label>
        <select
          name="cluster_rating"
          value={formData.cluster_rating}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '16px',
            color: '#1f2937'
          }}
        >
          <option value="">Select new cluster rating (optional)</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#1f2937', fontSize: '16px' }}>New Skills (comma-separated):</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleInputChange}
          placeholder="Enter new skills (optional)"
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '16px',
            color: '#1f2937'
          }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#1f2937', fontSize: '16px' }}>New Years of Experience:</label>
        <input
          type="number"
          name="years_of_experience"
          value={formData.years_of_experience}
          onChange={handleInputChange}
          placeholder="Enter new years of experience (optional)"
          min="0"
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '16px',
            color: '#1f2937'
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => handleFormSubmit('Edit Leader')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Update Leader
        </button>
        <button
          onClick={() => setActiveForm(null)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const renderDeleteForm = () => (
    <div style={{ 
      marginTop: '20px', 
      padding: '30px', 
      backgroundColor: 'white',
      borderRadius: '12px', 
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e0e0e0',
      width: '100%' 
    }}>
      <h3 style={{ color: '#1f2937', marginBottom: '20px', fontSize: '24px' }}>Delete Leader</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#1f2937', fontSize: '16px' }}>Cluster ID:</label>
        <input
          type="number"
          name="cluster_id"
          value={formData.cluster_id}
          onChange={handleInputChange}
          placeholder="Enter cluster ID to delete leader"
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '16px',
            color: '#1f2937'
          }}
        />
      </div>
      <div style={{ 
        marginBottom: '15px', 
        padding: '15px', 
        backgroundColor: '#f8d7da', 
        border: '1px solid #f5c6cb', 
        borderRadius: '4px',
        color: '#721c24'
      }}>
        <strong>⚠️ Warning:</strong> This action cannot be undone. Please confirm you want to delete the leader.
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => handleFormSubmit('Delete Leader')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Delete Leader
        </button>
        <button
          onClick={() => setActiveForm(null)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ 
      padding: '30px', 
      maxWidth: '800px', 
      margin: '0 auto', 
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>Leader Management System</h1>
      
      {/* Action Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '30px', 
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => setActiveForm('add')}
          style={{
            padding: '15px 30px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Add Leader
        </button>
        
        <button
          onClick={() => setActiveForm('edit')}
          style={{
            padding: '15px 30px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Edit Leader
        </button>
        
        <button
          onClick={() => setActiveForm('delete')}
          style={{
            padding: '15px 30px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Delete Leader
        </button>
      </div>

      {/* Conditional Form Rendering */}
      {activeForm === 'add' && renderAddForm()}
      {activeForm === 'edit' && renderEditForm()}
      {activeForm === 'delete' && renderDeleteForm()}

      {/* Instructions */}
      {!activeForm && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          color: '#6c757d'
        }}>
          <h3>Welcome to Leader Management</h3>
          <p>Select an action above to manage leaders:</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>📝 <strong>Add Leader:</strong> Create a new leader with all details</li>
            <li>✏️ <strong>Edit Leader:</strong> Search and update existing leader information</li>
            <li>🗑️ <strong>Delete Leader:</strong> Remove a leader by cluster ID</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Appleader;