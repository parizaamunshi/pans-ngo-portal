import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Payment.css'

const Payment = () => {
    const [clusters, setClusters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expandedClusters, setExpandedClusters] = useState({});
    const [paymentStatus, setPaymentStatus] = useState({});

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
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }

    const toggleCluster = (clusterId) => {
        setExpandedClusters(prev => ({
            ...prev,
            [clusterId]: !prev[clusterId]
        }));
    }

    const calculateTotalAmount = (artisans) => {
        return artisans.reduce((total, artisan) => total + (artisan.amount_to_be_paid || 0), 0);
    }

    const handlePayAll = async (clusterId, totalAmount) => {
        setPaymentStatus(prev => ({ ...prev, [clusterId]: 'processing' }));
        
        try {
            const response = await axios.post(`http://localhost:3000/api/clusters/${clusterId}/pay`);
            
            if (response.status === 200) {
                setPaymentStatus(prev => ({ ...prev, [clusterId]: 'completed' }));
                
                // Refresh the data to show updated payment amounts
                setTimeout(() => {
                    getData();
                    setPaymentStatus(prev => ({ ...prev, [clusterId]: null }));
                }, 2000);
                
                alert(`Payment of ₹${totalAmount.toLocaleString()} processed successfully for Cluster ${clusterId}!`);
            }
        } catch (error) {
            console.error('Payment processing failed:', error);
            setPaymentStatus(prev => ({ ...prev, [clusterId]: null }));
            alert('Payment processing failed. Please try again.');
        }
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    }

    if (loading) {
        return (
            <div className="payment-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading payment data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-container">
            <div className="payment-header">
                <h1>💳 Payment Management</h1>
                <p>Manage artisan payments across all clusters</p>
            </div>

            <div className="payment-stats">
                <div className="stat-card">
                    <h3>Total Clusters</h3>
                    <span className="stat-number">{clusters.length}</span>
                </div>
                <div className="stat-card">
                    <h3>Total Artisans</h3>
                    <span className="stat-number">
                        {clusters.reduce((total, cluster) => total + (cluster.artisans?.length || 0), 0)}
                    </span>
                </div>
                <div className="stat-card">
                    <h3>Total Pending</h3>
                    <span className="stat-number">
                        {formatCurrency(clusters.reduce((total, cluster) => 
                            total + calculateTotalAmount(cluster.artisans || []), 0
                        ))}
                    </span>
                </div>
            </div>

            <div className="clusters-container">
                {clusters.length === 0 ? (
                    <div className="no-data">
                        <h3>No clusters found</h3>
                        <p>Please check back later or contact support.</p>
                    </div>
                ) : (
                    clusters.map((cluster) => {
                        const isExpanded = expandedClusters[cluster.cluster_id];
                        const totalAmount = calculateTotalAmount(cluster.artisans || []);
                        const status = paymentStatus[cluster.cluster_id];

                        return (
                            <div key={cluster.cluster_id} className="cluster-accordion">
                                <div 
                                    className="accordion-header"
                                    onClick={() => toggleCluster(cluster.cluster_id)}
                                >
                                    <div className="header-left">
                                        <h3>Cluster {cluster.cluster_id}</h3>
                                        <div className="cluster-info">
                                            <span className="artisan-count">
                                                {cluster.artisans?.length || 0} Artisans
                                            </span>
                                            <span className="cluster-rating">
                                                ⭐ {cluster.cluster_rating}/5
                                            </span>
                                        </div>
                                    </div>
                                    <div className="header-right">
                                        <span className="total-amount">
                                            {formatCurrency(totalAmount)}
                                        </span>
                                        <div className={`arrow ${isExpanded ? 'expanded' : ''}`}>
                                            ▼
                                        </div>
                                    </div>
                                </div>

                                <div className={`accordion-content ${isExpanded ? 'expanded' : ''}`}>
                                    <div className="artisans-list">
                                        {cluster.artisans && cluster.artisans.length > 0 ? (
                                            cluster.artisans.map((artisan, index) => (
                                                <div key={artisan.artisan_id || index} className="artisan-card">
                                                    <div className="artisan-info">
                                                        <div className="artisan-name">
                                                            <h4>{artisan.artisan_name}</h4>
                                                            <span className="artisan-id">ID: {artisan.artisan_id}</span>
                                                        </div>
                                                        <div className="artisan-details">
                                                            <span className="rating">⭐ {artisan.artisan_rating}</span>
                                                            <span className="orders">📦 {artisan.total_orders} orders</span>
                                                            <span className="skills">🔧 {artisan.skills?.join(', ') || 'No skills listed'}</span>
                                                        </div>
                                                    </div>
                                                    <div className="payment-amount">
                                                        <span className="amount">
                                                            {formatCurrency(artisan.amount_to_be_paid || 0)}
                                                        </span>
                                                        <span className="status pending">Pending</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="no-artisans">
                                                <p>No artisans in this cluster</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="cluster-footer">
                                        <div className="total-section">
                                            <span className="total-label">Total Amount:</span>
                                            <span className="total-value">{formatCurrency(totalAmount)}</span>
                                        </div>
                                        <button 
                                            className={`pay-all-btn ${status ? status : ''}`}
                                            onClick={() => handlePayAll(cluster.cluster_id, totalAmount)}
                                            disabled={status === 'processing' || totalAmount === 0}
                                        >
                                            {status === 'processing' ? (
                                                <>
                                                    <div className="btn-spinner"></div>
                                                    Processing...
                                                </>
                                            ) : status === 'completed' ? (
                                                <>
                                                    ✅ Payment Completed
                                                </>
                                            ) : (
                                                <>
                                                    💳 Pay All
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    )
}

export default Payment
