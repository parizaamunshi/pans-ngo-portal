import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const TrackOrder = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    
    // State management
    const [orderData, setOrderData] = useState(null);
    const [clusterData, setClusterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    // Fetch order data
    useEffect(() => {
        if (orderId) {
            fetchOrderData();
        } else {
            // If no orderId in params, fetch the latest order for demo
            fetchLatestOrder();
        }
    }, [orderId]);

    const fetchOrderData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/orderDetails`);
            const orders = response.data;
            
            // Find the specific order or use the latest one
            const order = orderId 
                ? orders.find(o => o._id === orderId)
                : orders[orders.length - 1]; // Latest order
            
            if (order) {
                setOrderData(order);
                if (order.assignedTo && order.assignedTo.length > 0) {
                    await fetchClusterData(order.assignedTo[0]);
                }
            } else {
                setError("Order not found");
            }
        } catch (error) {
            console.error("Error fetching order data:", error);
            setError("Failed to fetch order data");
        } finally {
            setLoading(false);
        }
    };

    const fetchLatestOrder = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/orderDetails`);
            const orders = response.data;
            
            if (orders.length > 0) {
                const latestOrder = orders[orders.length - 1];
                setOrderData(latestOrder);
                if (latestOrder.assignedTo && latestOrder.assignedTo.length > 0) {
                    await fetchClusterData(latestOrder.assignedTo[0]);
                }
            } else {
                setError("No orders found");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    const fetchClusterData = async (clusterId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/clusters/${clusterId}`);
            setClusterData(response.data);
        } catch (error) {
            console.error("Error fetching cluster data:", error);
        }
    };

    // Calculate progress percentage (hardcoded as requested)
    const getProgressPercentage = () => {
        if (!orderData) return 0;
        
        switch (orderData.status) {
            case 'Pending': return 15;
            case 'In Progress': return 45;
            case 'Completed': return 100;
            default: return 0;
        }
    };

    // Get step status
    const getStepStatus = (stepIndex) => {
        if (!orderData) return 'pending';
        
        const progress = getProgressPercentage();
        
        switch (stepIndex) {
            case 0: return 'active'; // Order placed - active (blue)
            case 1: return orderData.assignedTo ? 'active' : 'pending'; // Assigned to cluster - active (blue)
            case 2: return 'completed'; // In progress - completed (green)
            case 3: return orderData.status === 'Completed' ? 'completed' : 'pending'; // Delivered
            default: return 'pending';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                        width: '50px', 
                        height: '50px', 
                        border: '4px solid #e2e8f0', 
                        borderTop: '4px solid #3182ce', 
                        borderRadius: '50%', 
                        animation: 'spin 1s linear infinite', 
                        margin: '0 auto 1rem' 
                    }}></div>
                    <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>Loading order details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', textAlign: 'center', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
                <div style={{ background: '#fed7d7', color: '#c53030', padding: '2rem', borderRadius: '12px', border: '1px solid #feb2b2' }}>
                    <h3 style={{ margin: '0 0 1rem 0' }}>Error Loading Order</h3>
                    <p style={{ margin: '0 0 1rem 0' }}>{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        style={{ 
                            background: '#c53030', 
                            color: 'white', 
                            border: 'none', 
                            padding: '0.75rem 1.5rem', 
                            borderRadius: '8px', 
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500'
                        }}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!orderData) {
        return (
            <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', textAlign: 'center', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
                <div style={{ background: '#f7fafc', color: '#4a5568', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ margin: '0 0 1rem 0' }}>No Order Found</h3>
                    <p style={{ margin: '0 0 1rem 0' }}>Please create an order first to track its progress.</p>
                    <button 
                        onClick={() => navigate('/admin')} 
                        style={{ 
                            background: '#3182ce', 
                            color: 'white', 
                            border: 'none', 
                            padding: '0.75rem 1.5rem', 
                            borderRadius: '8px', 
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500'
                        }}
                    >
                        Create Order
                    </button>
                </div>
            </div>
        );
    }

    const steps = [
        {
            title: 'Order Placed',
            description: 'Your order has been successfully placed',
            date: orderData.orderDate,
            status: getStepStatus(0)
        },
        {
            title: 'Assigned to Cluster',
            description: clusterData ? `Assigned to Cluster ${clusterData.cluster_id}` : 'Being assigned to production cluster',
            date: orderData.assignedTo ? orderData.orderDate : null,
            status: getStepStatus(1)
        },
        {
            title: 'Production in Progress',
            description: `${getProgressPercentage()}% completed`,
            date: orderData.status !== 'Pending' ? orderData.orderDate : null,
            status: getStepStatus(2)
        },
        {
            title: 'Delivered',
            description: `Expected delivery`,
            date: orderData.estimatedDeliveryDate,
            status: getStepStatus(3)
        }
    ];

    return (
        <div style={{ 
            maxWidth: '900px', 
            margin: '0 auto', 
            padding: '2rem', 
            fontFamily: 'Segoe UI, Arial, sans-serif',
            background: '#f8fafc',
            minHeight: '100vh'
        }}>
            {/* Header */}
            <div style={{ 
                background: 'white', 
                borderRadius: '12px', 
                padding: '2rem', 
                marginBottom: '2rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h1 style={{ margin: 0, color: '#2d3748', fontSize: '2rem', fontWeight: '700' }}>
                        Order Tracking
                    </h1>
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            background: '#e2e8f0',
                            color: '#4a5568',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#cbd5e0'}
                        onMouseLeave={(e) => e.target.style.background = '#e2e8f0'}
                    >
                        Back
                    </button>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                        <span style={{ color: '#718096', fontSize: '0.9rem', fontWeight: '500' }}>Order ID:</span>
                        <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600' }}>
                            {orderData._id?.slice(-8) || 'N/A'}
                        </p>
                    </div>
                    <div>
                        <span style={{ color: '#718096', fontSize: '0.9rem', fontWeight: '500' }}>Product:</span>
                        <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600' }}>
                            {orderData.typeOfProduct}
                        </p>
                    </div>
                    <div>
                        <span style={{ color: '#718096', fontSize: '0.9rem', fontWeight: '500' }}>Customer:</span>
                        <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600' }}>
                            {orderData.customerName}
                        </p>
                    </div>
                    <div>
                        <span style={{ color: '#718096', fontSize: '0.9rem', fontWeight: '500' }}>Status:</span>
                        <p style={{ margin: '0.25rem 0 0 0' }}>
                            <span style={{
                                background: orderData.status === 'Pending' ? '#fef5e7' : 
                                          orderData.status === 'In Progress' ? '#ebf8ff' : '#f0fff4',
                                color: orderData.status === 'Pending' ? '#c05621' : 
                                      orderData.status === 'In Progress' ? '#2b6cb0' : '#25855a',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '6px',
                                fontSize: '0.85rem',
                                fontWeight: '600'
                            }}>
                                {orderData.status}
                            </span>
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
                    <button
                        onClick={() => setShowOrderDetails(!showOrderDetails)}
                        style={{
                            background: '#3182ce',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#2c5aa0'}
                        onMouseLeave={(e) => e.target.style.background = '#3182ce'}
                    >
                        {showOrderDetails ? 'Hide Order Details' : 'View Order Details'}
                    </button>
                </div>
            </div>

            {/* Order Details */}
            {showOrderDetails && (
                <div style={{ 
                    background: 'white', 
                    borderRadius: '12px', 
                    padding: '2rem', 
                    marginBottom: '2rem',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #e2e8f0'
                }}>
                    <h3 style={{ margin: '0 0 1.5rem 0', color: '#2d3748', fontSize: '1.25rem', fontWeight: '600' }}>
                        Order Details
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                        <div>
                            <span style={{ color: '#718096', fontSize: '0.9rem', fontWeight: '500' }}>Quantity:</span>
                            <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600' }}>
                                {orderData.orderQuantity} units
                            </p>
                        </div>
                        <div>
                            <span style={{ color: '#718096', fontSize: '0.9rem', fontWeight: '500' }}>Cost:</span>
                            <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600' }}>
                                ₹{orderData.productCost?.toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <span style={{ color: '#718096', fontSize: '0.9rem', fontWeight: '500' }}>Delivery Address:</span>
                            <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600' }}>
                                {orderData.deliveryAddress}
                            </p>
                        </div>
                        <div>
                            <span style={{ color: '#718096', fontSize: '0.9rem', fontWeight: '500' }}>Specifications:</span>
                            <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600' }}>
                                {orderData.specifications || 'Standard specifications'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Timeline */}
            <div style={{ 
                background: 'white', 
                borderRadius: '12px', 
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e2e8f0'
            }}>
                <h3 style={{ margin: '0 0 2rem 0', color: '#2d3748', fontSize: '1.25rem', fontWeight: '600' }}>
                    Order Progress
                </h3>
                
                <div style={{ position: 'relative' }}>
                    {/* Vertical line */}
                    <div style={{
                        position: 'absolute',
                        left: '20px',
                        top: '0',
                        bottom: '0',
                        width: '2px',
                        background: '#e2e8f0'
                    }}></div>

                    {steps.map((step, index) => (
                        <div key={index} style={{ 
                            position: 'relative', 
                            paddingLeft: '60px', 
                            paddingBottom: index === steps.length - 1 ? '0' : '3rem'
                        }}>
                            {/* Step circle */}
                            <div style={{
                                position: 'absolute',
                                left: '10px',
                                top: '0',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                background: step.status === 'completed' ? '#38a169' : 
                                          step.status === 'active' ? '#3182ce' : '#e2e8f0',
                                border: '3px solid white',
                                boxShadow: '0 0 0 2px ' + (step.status === 'completed' ? '#38a169' : 
                                                         step.status === 'active' ? '#3182ce' : '#e2e8f0')
                            }}></div>

                            {/* Step content */}
                            <div style={{ background: '#f7fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <h4 style={{ 
                                        margin: 0, 
                                        color: step.status === 'completed' ? '#38a169' : 
                                               step.status === 'active' ? '#3182ce' : '#718096',
                                        fontSize: '1.1rem',
                                        fontWeight: '600'
                                    }}>
                                        {step.title}
                                    </h4>
                                    <span style={{
                                        background: step.status === 'completed' ? '#f0fff4' : 
                                                   step.status === 'active' ? '#ebf8ff' : '#f7fafc',
                                        color: step.status === 'completed' ? '#25855a' : 
                                               step.status === 'active' ? '#2b6cb0' : '#718096',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '6px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        textTransform: 'capitalize'
                                    }}>
                                        {step.status}
                                    </span>
                                </div>
                                <p style={{ margin: '0 0 0.75rem 0', color: '#4a5568', fontSize: '0.95rem' }}>
                                    {step.description}
                                </p>
                                {step.date && (
                                    <p style={{ margin: 0, color: '#718096', fontSize: '0.85rem', fontWeight: '500' }}>
                                        {step.status === 'pending' && index === 3 ? 'Expected: ' : ''}
                                        {formatDate(step.date)}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default TrackOrder;
