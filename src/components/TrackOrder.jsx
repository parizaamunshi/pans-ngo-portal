import { useNavigate } from "react-router-dom";
import axios from 'axios';

//dummy data
let totalItems = 100;
let scannedItems = 45;
let progressPercentage = ((scannedItems / totalItems) * 100).toFixed(1);

const Timeline = ({orderId}) => {
    axios.get('/trackorder/:orderId', async (req, res) => {
    const orderId = parseInt(req.params.orderId); // Convert from string to number

    try {
        const order = await Order.findOne({ order_id: orderId });

        if (!order) {
        return res.status(404).json({ message: 'Order not found' });
        }

        const cluster = await Cluster.findOne({ cluster_id: order.assigned_cluster_id });

        if (!cluster) {
        return res.status(404).json({ message: 'Cluster not found for this order' });
        }

        res.json(cluster);
    } catch (err) {
        console.error('Error fetching cluster by order:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
    });

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
