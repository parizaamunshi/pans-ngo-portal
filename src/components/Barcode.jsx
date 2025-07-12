import React, { useState } from "react";
import { toast } from "react-toastify";

const parseBarcodeData = (barcodeText) => {
    const data = {};
    barcodeText.split(";").forEach((pair) => {
        const [key, value] = pair.split(":");
        if (key && value) data[key.trim()] = value.trim();
    });
    return data;
};

const DUMMY_BARCODE = "clusterId:123;artisanId:456;productId:789;unitId:001";

const Barcode = ({ onApprove, onReject }) => {
    const [barcode, setBarcode] = useState(null);
    const [scanned, setScanned] = useState(false);

    const handleDummyScan = () => {
        setBarcode(parseBarcodeData(DUMMY_BARCODE));
        setScanned(true);
    };

    const handleApprove = () => {
        if (onApprove && barcode) onApprove(barcode);
        toast.success("Product approved!");
        setBarcode(null);
        setScanned(false);
    };

    const handleReject = () => {
        if (onReject && barcode) onReject(barcode);
        toast.error("Product rejected.");
        setBarcode(null);
        setScanned(false);
    };

    return (
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
            {!scanned && (
                <button onClick={handleDummyScan}>
                    Load Dummy Barcode
                </button>
            )}
            {barcode && (
                <div style={{ marginTop: 20 }}>
                    <h3>Scanned Data:</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>Cluster ID:</td>
                                <td>{barcode.clusterId}</td>
                            </tr>
                            <tr>
                                <td>Artisan ID:</td>
                                <td>{barcode.artisanId}</td>
                            </tr>
                            <tr>
                                <td>Product ID:</td>
                                <td>{barcode.productId}</td>
                            </tr>
                            <tr>
                                <td>Unit ID:</td>
                                <td>{barcode.unitId}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ marginTop: 20 }}>
                        <button onClick={handleApprove} style={{ marginRight: 10, background: "green", color: "white" }}>
                            Approve
                        </button>
                        <button onClick={handleReject} style={{ background: "red", color: "white" }}>
                            Reject
                        </button>
                    </div>
                </div>
            )}
            {!barcode && scanned && (
                <div>
                    <p>No valid barcode found. Please try again.</p>
                    <button onClick={() => setScanned(false)}>Scan Again</button>
                </div>
            )}
        </div>
    );
};

export default Barcode;
