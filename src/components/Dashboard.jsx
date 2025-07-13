import './Dashboard.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [clusters, setClusters] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/clusters');
            setClusters(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching clusters:", error);
            setLoading(false);
        }
    };
    const calculateTotalPendingPayments = (clusters) => {
        return clusters.reduce((total, cluster) => {
            return total + (cluster.artisans?.reduce(
                (sum, artisan) => sum + (artisan.amount_to_be_paid || 0), 0
            ) || 0);
        }, 0);
    };

    const ordersPlaced = 12;
    const ordersPending = 7;
    const feedbackReceived = 0;

    return (
        <div className="dashboard-container">
            <h1>Admin Dashboard</h1>
            <div className="dashboard-cards">
                <div className="card">
                    <h2>Orders Placed</h2>
                    <p>{ordersPlaced}</p>
                </div>
                <div className="card">
                    <h2>Orders Pending</h2>
                    <p>{ordersPending}</p>
                </div>
                <div className="card">
                    <h2>Feedback Received</h2>
                    <p>{feedbackReceived}</p>
                </div>
                <div className="card">
                    <h2>Payments Pending</h2>
                    <p>{calculateTotalPendingPayments(clusters).toLocaleString('en-IN')}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
