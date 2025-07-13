import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
            <div style={{ 
                background: 'white', 
                borderRadius: 12, 
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', 
                padding: '2.5rem', 
                marginBottom: '2.5rem', 
                maxWidth: '1200px', 
                marginLeft: 'auto', 
                marginRight: 'auto', 
                border: '1px solid #e2e8f0' 
            }}>
                <div style={{ textAlign: 'center', padding: '3rem', color: '#718096' }}>
                    <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        border: '4px solid #e2e8f0', 
                        borderTop: '4px solid #3182ce', 
                        borderRadius: '50%', 
                        animation: 'spin 1s linear infinite', 
                        margin: '0 auto 1rem' 
                    }}></div>
                    <p>Loading payment data...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ 
            background: 'white', 
            borderRadius: 12, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', 
            padding: '2.5rem', 
            marginBottom: '2.5rem', 
            maxWidth: '1200px', 
            marginLeft: 'auto', 
            marginRight: 'auto', 
            border: '1px solid #e2e8f0',
            fontFamily: 'Segoe UI, Arial, sans-serif'
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h3 style={{ color: '#2d3748', margin: '0 0 0.5rem 0', fontSize: '1.75rem', fontWeight: '600' }}>💳 Payment Management</h3>
                <p style={{ color: '#718096', margin: 0, fontSize: '1rem' }}>Manage artisan payments across all clusters</p>
            </div>

            {/* Stats Section */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1.5rem', 
                marginBottom: '2.5rem' 
            }}>
                <div style={{ 
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                    border: '2px solid #e2e8f0', 
                    borderRadius: '12px', 
                    padding: '1.5rem',
                    textAlign: 'center',
                    transition: 'all 0.2s ease'
                }}>
                    <h4 style={{ color: '#6b7280', margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Clusters</h4>
                    <span style={{ color: '#1f2937', fontSize: '2rem', fontWeight: '800' }}>{clusters.length}</span>
                </div>
                <div style={{ 
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                    border: '2px solid #e2e8f0', 
                    borderRadius: '12px', 
                    padding: '1.5rem',
                    textAlign: 'center',
                    transition: 'all 0.2s ease'
                }}>
                    <h4 style={{ color: '#6b7280', margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Artisans</h4>
                    <span style={{ color: '#1f2937', fontSize: '2rem', fontWeight: '800' }}>
                        {clusters.reduce((total, cluster) => total + (cluster.artisans?.length || 0), 0)}
                    </span>
                </div>
                <div style={{ 
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%)', 
                    border: '2px solid #f59e0b', 
                    borderRadius: '12px', 
                    padding: '1.5rem',
                    textAlign: 'center',
                    transition: 'all 0.2s ease'
                }}>
                    <h4 style={{ color: '#92400e', margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Pending</h4>
                    <span style={{ color: '#92400e', fontSize: '2rem', fontWeight: '800' }}>
                        {formatCurrency(clusters.reduce((total, cluster) => 
                            total + calculateTotalAmount(cluster.artisans || []), 0
                        ))}
                    </span>
                </div>
            </div>

            {/* Clusters Section */}
            <div>
                {clusters.length === 0 ? (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '3rem 2rem',
                        background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                        borderRadius: '12px',
                        border: '2px dashed #d1d5db'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>💳</div>
                        <h4 style={{ color: '#6b7280', margin: '0 0 0.5rem 0' }}>No clusters found</h4>
                        <p style={{ color: '#9ca3af', margin: 0, fontSize: '0.9rem' }}>Please check back later or contact support</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {clusters.map((cluster) => {
                            const isExpanded = expandedClusters[cluster.cluster_id];
                            const totalAmount = calculateTotalAmount(cluster.artisans || []);
                            const status = paymentStatus[cluster.cluster_id];

                            return (
                                <div key={cluster.cluster_id} style={{ 
                                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                                    border: '2px solid #e2e8f0', 
                                    borderRadius: '16px', 
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease'
                                }}>
                                    {/* Cluster Header */}
                                    <div 
                                        onClick={() => toggleCluster(cluster.cluster_id)}
                                        style={{ 
                                            padding: '1.5rem 2rem', 
                                            cursor: 'pointer', 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center',
                                            background: isExpanded ? 'white' : 'transparent',
                                            borderBottom: isExpanded ? '2px solid #e2e8f0' : 'none',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isExpanded) {
                                                e.currentTarget.style.background = 'white';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isExpanded) {
                                                e.currentTarget.style.background = 'transparent';
                                            }
                                        }}
                                    >
                                        <div>
                                            <h4 style={{ color: '#1e40af', margin: '0 0 0.5rem 0', fontSize: '1.3rem', fontWeight: '700' }}>
                                                Cluster {cluster.cluster_id}
                                            </h4>
                                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                <span style={{ 
                                                    background: 'linear-gradient(135deg, #3182ce 0%, #2563eb 100%)', 
                                                    color: 'white', 
                                                    padding: '0.25rem 0.75rem', 
                                                    borderRadius: '12px', 
                                                    fontSize: '0.8rem', 
                                                    fontWeight: '600'
                                                }}>
                                                    {cluster.artisans?.length || 0} Artisans
                                                </span>
                                                <span style={{ color: '#d97706', fontSize: '0.9rem', fontWeight: '600' }}>
                                                    ⭐ {cluster.cluster_rating}/5
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <span style={{ 
                                                background: totalAmount > 0 ? 'linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%)' : 'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)', 
                                                color: totalAmount > 0 ? '#92400e' : '#16a34a', 
                                                padding: '0.5rem 1rem', 
                                                borderRadius: '12px', 
                                                fontSize: '1.1rem', 
                                                fontWeight: '700',
                                                border: totalAmount > 0 ? '1px solid #f59e0b' : '1px solid #22c55e'
                                            }}>
                                                {formatCurrency(totalAmount)}
                                            </span>
                                            <div style={{ 
                                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', 
                                                transition: 'transform 0.2s ease',
                                                fontSize: '1.2rem',
                                                color: '#6b7280'
                                            }}>
                                                ▼
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cluster Content */}
                                    {isExpanded && (
                                        <div style={{ padding: '1.5rem 2rem' }}>
                                            {/* Artisans List */}
                                            <div style={{ marginBottom: '2rem' }}>
                                                {cluster.artisans && cluster.artisans.length > 0 ? (
                                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                                        {cluster.artisans.map((artisan, index) => (
                                                            <div key={artisan.artisan_id || index} style={{ 
                                                                background: 'white', 
                                                                border: '2px solid #e5e7eb',
                                                                borderRadius: '12px', 
                                                                padding: '1.25rem',
                                                                transition: 'all 0.2s ease',
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center'
                                                            }}>
                                                                <div>
                                                                    <div style={{ marginBottom: '0.5rem' }}>
                                                                        <h5 style={{ color: '#111827', margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: '700' }}>
                                                                            {artisan.artisan_name}
                                                                        </h5>
                                                                        <p style={{ color: '#6b7280', margin: 0, fontSize: '0.85rem' }}>
                                                                            ID: {artisan.artisan_id}
                                                                        </p>
                                                                    </div>
                                                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.85rem' }}>
                                                                        <span style={{ color: '#d97706', fontWeight: '600' }}>⭐ {artisan.artisan_rating}</span>
                                                                        <span style={{ color: '#3182ce', fontWeight: '600' }}> {artisan.total_orders} orders</span>
                                                                        <span style={{ color: '#059669', fontWeight: '600' }}> {artisan.skills?.join(', ') || 'No skills listed'}</span>
                                                                    </div>
                                                                </div>
                                                                <div style={{ textAlign: 'right' }}>
                                                                    <div style={{ 
                                                                        background: artisan.amount_to_be_paid > 0 ? 'linear-gradient(135deg, #fecaca 0%, #fee2e2 100%)' : 'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)', 
                                                                        color: artisan.amount_to_be_paid > 0 ? '#dc2626' : '#16a34a', 
                                                                        padding: '0.5rem 1rem', 
                                                                        borderRadius: '8px', 
                                                                        fontSize: '1rem', 
                                                                        fontWeight: '700',
                                                                        border: artisan.amount_to_be_paid > 0 ? '1px solid #ef4444' : '1px solid #22c55e',
                                                                        marginBottom: '0.5rem'
                                                                    }}>
                                                                        {formatCurrency(artisan.amount_to_be_paid || 0)}
                                                                    </div>
                                                                    <span style={{ 
                                                                        background: artisan.amount_to_be_paid > 0 ? '#fef5e7' : '#f0fff4', 
                                                                        color: artisan.amount_to_be_paid > 0 ? '#c05621' : '#25855a', 
                                                                        padding: '0.25rem 0.75rem', 
                                                                        borderRadius: '6px', 
                                                                        fontSize: '0.75rem', 
                                                                        fontWeight: '600',
                                                                        textTransform: 'uppercase'
                                                                    }}>
                                                                        {artisan.amount_to_be_paid > 0 ? 'Pending' : 'Paid'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div style={{ 
                                                        textAlign: 'center', 
                                                        padding: '2rem',
                                                        background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                                                        borderRadius: '12px',
                                                        border: '2px dashed #d1d5db'
                                                    }}>
                                                        <p style={{ color: '#6b7280', margin: 0 }}>No artisans in this cluster</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Footer with Total and Pay Button */}
                                            <div style={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between', 
                                                alignItems: 'center',
                                                padding: '1.5rem',
                                                background: 'white',
                                                borderRadius: '12px',
                                                border: '2px solid #e2e8f0'
                                            }}>
                                                <div>
                                                    <span style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: '500', marginRight: '0.5rem' }}>Total Amount:</span>
                                                    <span style={{ color: '#1f2937', fontSize: '1.5rem', fontWeight: '800' }}>{formatCurrency(totalAmount)}</span>
                                                </div>
                                                <button 
                                                    onClick={() => handlePayAll(cluster.cluster_id, totalAmount)}
                                                    disabled={status === 'processing' || totalAmount === 0}
                                                    style={{ 
                                                        background: status === 'completed' ? 
                                                            'linear-gradient(135deg, #059669 0%, #047857 100%)' :
                                                            status === 'processing' ? 
                                                            'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)' :
                                                            totalAmount === 0 ?
                                                            'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)' :
                                                            'linear-gradient(135deg, #3182ce 0%, #2563eb 100%)',
                                                        color: 'white', 
                                                        border: 'none', 
                                                        padding: '0.75rem 2rem', 
                                                        fontSize: '1rem', 
                                                        fontWeight: '600',
                                                        borderRadius: '10px', 
                                                        cursor: (status === 'processing' || totalAmount === 0) ? 'not-allowed' : 'pointer',
                                                        opacity: (status === 'processing' || totalAmount === 0) ? 0.7 : 1,
                                                        transition: 'all 0.2s ease',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.05em',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (status !== 'processing' && totalAmount > 0) {
                                                            e.target.style.transform = 'translateY(-2px)';
                                                            e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.transform = 'translateY(0)';
                                                        e.target.style.boxShadow = 'none';
                                                    }}
                                                >
                                                    {status === 'processing' ? (
                                                        <>
                                                            <div style={{
                                                                width: '16px',
                                                                height: '16px',
                                                                border: '2px solid #ffffff40',
                                                                borderTop: '2px solid #ffffff',
                                                                borderRadius: '50%',
                                                                animation: 'spin 1s linear infinite'
                                                            }}></div>
                                                            Processing...
                                                        </>
                                                    ) : status === 'completed' ? (
                                                        <> Payment Completed</>
                                                    ) : (
                                                        <>Pay All</>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Add animation keyframes */}
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    )
}

export default Payment