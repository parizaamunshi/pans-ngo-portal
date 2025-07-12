import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feedback from "./components/feedback";
import Village1 from "./components/villages/village1";
import Village2 from "./components/villages/village2";
import Village3 from "./components/villages/village3";
import Village4 from "./components/villages/village4";
import Village5 from "./components/villages/village5";
import Barcode from "./components/Barcode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const handleApprove = (data) => {
    // handle approve logic
  };

  const handleReject = (data) => {
    // handle reject logic
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feedback />} />
        <Route path="/village1" element={<Village1 />} />
        <Route path="/village2" element={<Village2 />} />
        <Route path="/village3" element={<Village3 />} />
        <Route path="/village4" element={<Village4 />} />
        <Route path="/village5" element={<Village5 />} />
        <Route
          path="/barcode"
          element={
            <>
              <h3 style={{ textAlign: "center", marginTop: "20px" }}>
                Product Approval
              </h3>
              <Barcode onApprove={handleApprove} onReject={handleReject} />
              <ToastContainer position="top-right" autoClose={2000} />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
