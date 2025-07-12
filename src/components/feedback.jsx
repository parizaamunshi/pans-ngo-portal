// import React, { useState } from 'react';
// import './Feedback.css';

// const Feedback = () => {
//   const [selectedVillage, setSelectedVillage] = useState('');

//   const handleSelectChange = (e) => {
//     setSelectedVillage(e.target.value);
//   };

//   return (
//     <div className="page-wrapper">
//       <h1 className="feedback-title">Feedback</h1>

//       <div className="center-content">
//         <div className="dropdown-container">
//           <select
//             value={selectedVillage}
//             onChange={handleSelectChange}
//             className="feedback-dropdown"
//           >
//             <option value="">Select a Cluster</option>
//             <option value="village1">Village 1</option>
//             <option value="village2">Village 2</option>
//             <option value="village3">Village 3</option>
//             <option value="village4">Village 4</option>
//             <option value="village5">Village 5</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Feedback;



// src/components/Feedback.jsx
import React from 'react';
import './Feedback.css';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value) {
      navigate(`/${value}`);
    }
  };

  return (
    <div className="page-wrapper">
      <h1 className="feedback-title">Feedback</h1>
      <div className="center-content">
        <div className="dropdown-container">
          <select className="feedback-dropdown" onChange={handleSelectChange} defaultValue="">
            <option value="" disabled>Select a Cluster</option>
            <option value="village1">Village 1</option>
            <option value="village2">Village 2</option>
            <option value="village3">Village 3</option>
            <option value="village4">Village 4</option>
            <option value="village5">Village 5</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

