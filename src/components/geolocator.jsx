import React, { useState } from "react";
import * as exifr from "exifr";
import Tesseract from "tesseract.js";
import "./PhotoGeoLocator.css";

const PhotoGeoLocator = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [originCountry, setOriginCountry] = useState("");
  const [gps, setGps] = useState(null);

  const handleFile = async (file) => {
    setLoading(true);
    setText("");
    setOriginCountry("");
    setGps(null);

    try {
      const gpsData = await exifr.gps(file);
      if (gpsData?.latitude && gpsData?.longitude) {
        setGps({ latitude: gpsData.latitude, longitude: gpsData.longitude });
      }

      const imageURL = URL.createObjectURL(file);
      const result = await Tesseract.recognize(imageURL, "eng");
      const extractedText = result.data.text;
      setText(extractedText);

      const match = extractedText.match(/Made in ([A-Za-z\s]+)/i);
      if (match) setOriginCountry(match[1].trim());
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    if (e.target.files?.length) handleFile(e.target.files[0]);
  };

  return (
    <div className="geo-page">
      <header className="geo-header">
        <h1>📍 Product Verification Tool</h1>
      </header>

      <main className="geo-main">
        <div className="geo-container-formal">
          <h2 className="geo-title-formal">Analyze Product Photo</h2>
          <p className="geo-subtitle-formal">
            Upload a product image to extract text and GPS metadata.
          </p>

          <label className="geo-drop-label-formal">
            <input type="file" accept="image/*" onChange={handleChange} hidden />
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="geo-drop-box-formal"
            >
              Click or Drop Image Here
            </div>
          </label>

          {loading && <p className="geo-loading-formal">Processing image...</p>}

          {!loading && gps && (
            <div className="geo-card-formal gps">
              <h3>GPS Coordinates</h3>
              <p>Latitude: {gps.latitude.toFixed(5)}</p>
              <p>Longitude: {gps.longitude.toFixed(5)}</p>
              <a
                href={`https://www.google.com/maps?q=${gps.latitude},${gps.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="geo-link-formal"
              >
                Open in Google Maps
              </a>
            </div>
          )}

          {!loading && originCountry && (
            <div className="geo-card-formal origin">
              <h3>Country of Origin</h3>
              <p>Detected: <strong>{originCountry}</strong></p>
            </div>
          )}

          {!loading && text && (
            <div className="geo-card-formal ocr">
              <h3>Extracted Text</h3>
              <pre>{text}</pre>
            </div>
          )}
        </div>
      </main>

      <footer className="geo-footer">
        &copy; 2025 Verified Origins Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default PhotoGeoLocator;
