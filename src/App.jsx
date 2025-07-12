import React from "react";
import Barcode from "./components/Barcode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const handleApprove = (data) => { };

  const handleReject = (data) => { };

  return (
    <div>
      <h3>Product Approval</h3>
      <Barcode onApprove={handleApprove} onReject={handleReject} />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
