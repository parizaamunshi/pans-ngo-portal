import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import JsBarcode from "jsbarcode";
import axios from "axios";

const Barcode = () => {
    const [scannedData, setScannedData] = useState(null);
    const [clusterData, setClusterData] = useState(null);
    const [artisanData, setArtisanData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [scanning, setScanning] = useState(false);
    const barcodeRef = useRef(null);

    // Generate demo barcode data
    const generateBarcodeData = () => {
        const clusterId = Math.floor(Math.random() * 10) + 1; // 1-10
        const artisanId = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
        const productId = Math.floor(Math.random() * 900) + 100; // 100-999
        const unitId = String(Math.floor(Math.random() * 900) + 100).padStart(3, '0'); // 001-999
        
        return `${clusterId},${artisanId},0102${productId},${unitId}`;
    };

    const DEMO_BARCODE = generateBarcodeData();

    // Generate barcode on component mount
    useEffect(() => {
        if (barcodeRef.current) {
            JsBarcode(barcodeRef.current, DEMO_BARCODE, {
                format: "CODE128",
                width: 2,
                height: 80,
                displayValue: true,
                fontSize: 14,
                textMargin: 8,
                background: "#ffffff",
                lineColor: "#000000"
            });
        }
    }, [DEMO_BARCODE]);

    const parseBarcodeData = (barcodeText) => {
        const parts = barcodeText.split(',');
        if (parts.length === 4) {
            return {
                clusterId: parts[0].trim(),
                artisanId: parts[1].trim(),
                productId: parts[2].trim(),
                unitId: parts[3].trim()
            };
        }
        return null;
    };

    const fetchClusterData = async (clusterId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/clusters/${clusterId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching cluster data:", error);
            return null;
        }
    };

    const updateArtisanPayment = async (clusterId, artisanId) => {
        try {
            // First get cluster data to find the artisan
            const clusterResponse = await axios.get(`http://localhost:3000/api/clusters/${clusterId}`);
            const cluster = clusterResponse.data;
            
            if (cluster && cluster.artisans) {
                const artisan = cluster.artisans.find(a => a.artisan_id == artisanId);
                if (artisan) {
                    // Update the artisan's payment by adding 100
                    const updatedPayment = (artisan.amount_to_be_paid || 0) + 100;
                    
                    // You would typically have an API endpoint to update individual artisan payments
                    // For now, we'll simulate this with a console log
                    console.log(`Updated payment for artisan ${artisanId}: +100 (Total: ${updatedPayment})`);
                    
                    return { success: true, newAmount: updatedPayment, artisan };
                }
            }
            return { success: false, message: "Artisan not found" };
        } catch (error) {
            console.error("Error updating artisan payment:", error);
            return { success: false, message: error.message };
        }
    };

    const handleScan = async () => {
        setScanning(true);
        setLoading(true);
        
        // Simulate scanning delay
        setTimeout(async () => {
            const parsedData = parseBarcodeData(DEMO_BARCODE);
            
            if (parsedData) {
                setScannedData(parsedData);
                
                // Fetch cluster data
                const cluster = await fetchClusterData(parsedData.clusterId);
                setClusterData(cluster);
                
                if (cluster && cluster.artisans) {
                    const artisan = cluster.artisans.find(a => a.artisan_id == parsedData.artisanId);
                    setArtisanData(artisan);
                    
                    // Update artisan payment
                    const paymentUpdate = await updateArtisanPayment(parsedData.clusterId, parsedData.artisanId);
                    
                    if (paymentUpdate.success) {
                        toast.success(`Payment updated! +₹100 added to ${artisan?.artisan_name || 'artisan'}'s account`);
                    } else {
                        toast.error("Failed to update payment");
                    }
                } else {
                    toast.error("Artisan not found in cluster");
                }
            } else {
                toast.error("Invalid barcode format");
            }
            
            setLoading(false);
            setScanning(false);
        }, 2000);
    };

    const handleReset = () => {
        setScannedData(null);
        setClusterData(null);
        setArtisanData(null);
        setScanning(false);
    };

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
                border: '1px solid #e2e8f0',
                textAlign: 'center'
            }}>
                <h1 style={{ margin: '0 0 0.5rem 0', color: '#2d3748', fontSize: '2rem', fontWeight: '700' }}>
                    Barcode Scanner
                </h1>
                <p style={{ margin: 0, color: '#718096', fontSize: '1.1rem' }}>
                    Scan product barcodes to track artisan work and update payments
                </p>
            </div>

            {/* Barcode Display */}
            <div style={{ 
                background: 'white', 
                borderRadius: '12px', 
                padding: '2rem', 
                marginBottom: '2rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
            }}>
                <h3 style={{ margin: '0 0 1.5rem 0', color: '#2d3748', fontSize: '1.25rem', fontWeight: '600' }}>
                    Demo Product Barcode
                </h3>
                
                <div style={{ 
                    background: '#f7fafc', 
                    padding: '2rem', 
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    marginBottom: '1.5rem'
                }}>
                    <svg ref={barcodeRef}></svg>
                </div>
                
                <div style={{ 
                    background: '#ebf8ff', 
                    padding: '1rem', 
                    borderRadius: '8px',
                    border: '1px solid #bee3f8',
                    marginBottom: '1.5rem'
                }}>
                    <p style={{ margin: 0, color: '#2b6cb0', fontSize: '0.9rem' }}>
                        <strong>Barcode Data:</strong> {DEMO_BARCODE}
                    </p>
                    <p style={{ margin: '0.5rem 0 0 0', color: '#4a5568', fontSize: '0.8rem' }}>
                        Format: cluster_id,artisan_id,product_id,unit_id
                    </p>
                </div>

                {!scannedData && (
                    <button
                        onClick={handleScan}
                        disabled={scanning}
                        style={{
                            background: scanning ? '#cbd5e0' : '#3182ce',
                            color: scanning ? '#4a5568' : 'white',
                            border: 'none',
                            padding: '1rem 2rem',
                            borderRadius: '8px',
                            cursor: scanning ? 'not-allowed' : 'pointer',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            margin: '0 auto',
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            if (!scanning) e.target.style.background = '#2c5aa0';
                        }}
                        onMouseLeave={(e) => {
                            if (!scanning) e.target.style.background = '#3182ce';
                        }}
                    >
                        {scanning ? (
                            <>
                                <div style={{ 
                                    width: '20px', 
                                    height: '20px', 
                                    border: '2px solid #4a5568', 
                                    borderTop: '2px solid white', 
                                    borderRadius: '50%', 
                                    animation: 'spin 1s linear infinite' 
                                }}></div>
                                Scanning...
                            </>
                        ) : (
                            <>
                                <span style={{ fontSize: '1.2rem' }}>📷</span>
                                Scan Barcode
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Scanning Results */}
            {scannedData && (
                <div style={{ 
                    background: 'white', 
                    borderRadius: '12px', 
                    padding: '2rem',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #e2e8f0'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ margin: 0, color: '#2d3748', fontSize: '1.25rem', fontWeight: '600' }}>
                            Scan Results
                        </h3>
                        <button
                            onClick={handleReset}
                            style={{
                                background: '#e2e8f0',
                                color: '#4a5568',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}
                        >
                            Scan New Barcode
                        </button>
                    </div>

                    {/* Scanned Data Display */}
                    <div style={{ 
                        background: '#f0fff4', 
                        padding: '1.5rem', 
                        borderRadius: '8px',
                        border: '1px solid #9ae6b4',
                        marginBottom: '2rem'
                    }}>
                        <h4 style={{ margin: '0 0 1rem 0', color: '#25855a', fontSize: '1.1rem', fontWeight: '600' }}>
                            ✓ Barcode Scanned Successfully
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <div>
                                <span style={{ color: '#4a5568', fontSize: '0.9rem', fontWeight: '500' }}>Cluster ID:</span>
                                <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600', fontSize: '1.1rem' }}>
                                    {scannedData.clusterId}
                                </p>
                            </div>
                            <div>
                                <span style={{ color: '#4a5568', fontSize: '0.9rem', fontWeight: '500' }}>Artisan ID:</span>
                                <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600', fontSize: '1.1rem' }}>
                                    {scannedData.artisanId}
                                </p>
                            </div>
                            <div>
                                <span style={{ color: '#4a5568', fontSize: '0.9rem', fontWeight: '500' }}>Product ID:</span>
                                <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600', fontSize: '1.1rem' }}>
                                    {scannedData.productId}
                                </p>
                            </div>
                            <div>
                                <span style={{ color: '#4a5568', fontSize: '0.9rem', fontWeight: '500' }}>Unit ID:</span>
                                <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600', fontSize: '1.1rem' }}>
                                    {scannedData.unitId}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Cluster Information */}
                    {clusterData && (
                        <div style={{ 
                            background: '#ebf8ff', 
                            padding: '1.5rem', 
                            borderRadius: '8px',
                            border: '1px solid #bee3f8',
                            marginBottom: '2rem'
                        }}>
                            <h4 style={{ margin: '0 0 1rem 0', color: '#2b6cb0', fontSize: '1.1rem', fontWeight: '600' }}>
                                Cluster Information
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                <div>
                                    <span style={{ color: '#4a5568', fontSize: '0.9rem', fontWeight: '500' }}>Cluster Rating:</span>
                                    <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600' }}>
                                        {clusterData.cluster_rating}/5 ⭐
                                    </p>
                                </div>
                                <div>
                                    <span style={{ color: '#4a5568', fontSize: '0.9rem', fontWeight: '500' }}>Leader ID:</span>
                                    <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600' }}>
                                        {clusterData.leader_id}
                                    </p>
                                </div>
                                <div>
                                    <span style={{ color: '#4a5568', fontSize: '0.9rem', fontWeight: '500' }}>Total Artisans:</span>
                                    <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600' }}>
                                        {clusterData.artisans?.length || 0}
                                    </p>
                                </div>
                                <div>
                                    <span style={{ color: '#4a5568', fontSize: '0.9rem', fontWeight: '500' }}>Leader Rating:</span>
                                    <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600' }}>
                                        {clusterData.leader_rating}/5 ⭐
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Artisan Information */}
                    {artisanData ? (
                        <div style={{ 
                            background: '#fef5e7', 
                            padding: '1.5rem', 
                            borderRadius: '8px',
                            border: '1px solid #f6d55c'
                        }}>
                            <h4 style={{ margin: '0 0 1rem 0', color: '#c05621', fontSize: '1.1rem', fontWeight: '600' }}>
                                Artisan Details & Payment Update
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <span style={{ color: '#4a5568', fontSize: '0.9rem', fontWeight: '500' }}>Name:</span>
                                    <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600' }}>
                                        {artisanData.artisan_name}
                                    </p>
                                </div>
                                <div>
                                    <span style={{ color: '#4a5568', fontSize: '0.9rem', fontWeight: '500' }}>Rating:</span>
                                    <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600' }}>
                                        {artisanData.artisan_rating}/5 ⭐
                                    </p>
                                </div>
                                <div>
                                    <span style={{ color: '#4a5568', fontSize: '0.9rem', fontWeight: '500' }}>Total Orders:</span>
                                    <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600' }}>
                                        {artisanData.total_orders}
                                    </p>
                                </div>
                                <div>
                                    <span style={{ color: '#4a5568', fontSize: '0.9rem', fontWeight: '500' }}>Experience:</span>
                                    <p style={{ margin: '0.25rem 0 0 0', color: '#2d3748', fontWeight: '600' }}>
                                        {artisanData.years_of_experience} years
                                    </p>
                                </div>
                            </div>
                            <div style={{ 
                                background: '#38a169', 
                                color: 'white', 
                                padding: '1rem', 
                                borderRadius: '6px',
                                textAlign: 'center'
                            }}>
                                <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: '600' }}>
                                    Payment Updated! +₹100
                                </p>
                                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
                                    Previous: ₹{artisanData.amount_to_be_paid || 0} → New: ₹{(artisanData.amount_to_be_paid || 0) + 100}
                                </p>
                            </div>
                        </div>
                    ) : clusterData && (
                        <div style={{ 
                            background: '#fed7d7', 
                            padding: '1.5rem', 
                            borderRadius: '8px',
                            border: '1px solid #feb2b2',
                            textAlign: 'center'
                        }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: '#c53030', fontSize: '1.1rem', fontWeight: '600' }}>
                                Artisan Not Found
                            </h4>
                            <p style={{ margin: 0, color: '#4a5568' }}>
                                Artisan ID {scannedData.artisanId} was not found in Cluster {scannedData.clusterId}
                            </p>
                        </div>
                    )}
                </div>
            )}

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

export default Barcode;
