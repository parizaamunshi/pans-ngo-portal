import React from "react";
import "./home_leader.css";

const HomeLeader = () => {
  return (
    <div className="leader-container">
      <button className="leader-btn">View Orders</button>
      <button className="leader-btn">Update Status</button>
      <button className="leader-btn">Track Orders</button>
      <button className="leader-btn">View Feedback</button>
    </div>
  );
};

export default HomeLeader;