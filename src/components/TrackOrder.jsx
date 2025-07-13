import { useNavigate } from "react-router-dom";

//dummy data
const totalItems = 100;
const scannedItems = 45;
const progressPercentage = ((scannedItems / totalItems) * 100).toFixed(1);

const Timeline = () => {
    const navigate = useNavigate();

    return (
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <ol style={{ listStyle: "none", padding: 0 }}>
                <li>
                    <button
                        onClick={() => navigate("/orderdetails")}
                        style={{ cursor: "pointer", background: "none", border: "none", color: "#1976d2", fontSize: "1.1em" }}
                    >
                        1. Order Received
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => navigate("/cluster-feedback")}
                        style={{ cursor: "pointer", background: "none", border: "none", color: "#1976d2", fontSize: "1.1em" }}
                    >
                        2. Allotted to Cluster
                    </button>
                </li>
                <li>
                    <span>
                        3. Progress: <b>{progressPercentage}%</b> completed ({scannedItems} of {totalItems} items)
                    </span>
                </li>
                <li>
                    <button
                        onClick={() => navigate("/delivery-details")}
                        style={{ cursor: "pointer", background: "none", border: "none", color: "#1976d2", fontSize: "1.1em" }}
                    >
                        4. Out for Delivery
                    </button>
                </li>
            </ol>
        </div>
    );
};

export default Timeline;
