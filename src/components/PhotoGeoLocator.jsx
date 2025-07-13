import React, { useState } from "react";
import * as exifr from "exifr";
import Tesseract from "tesseract.js";

const PhotoGeoLocator = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [originCountry, setOriginCountry] = useState("");
  const [gps, setGps] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleFile = async (file) => {
    setLoading(true);
    setText("");
    setOriginCountry("");
    setGps(null);
    setUploadedImage(URL.createObjectURL(file));

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
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      padding: '2rem 1rem'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 3rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          color: '#1e293b',
          fontSize: '2.5rem',
          fontWeight: '700',
          margin: '0 0 1rem 0',
          letterSpacing: '-0.025em'
        }}>
          Product Verification Tool
        </h1>
        <p style={{
          color: '#64748b',
          fontSize: '1.125rem',
          margin: 0,
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.6'
        }}>
          Advanced image analysis for product authenticity and origin verification
        </p>
      </div>

      {/* Main Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: uploadedImage ? '1fr 1fr' : '1fr',
        gap: '2rem',
        alignItems: 'start'
      }}>
        
        {/* Upload Section */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0',
          padding: '2.5rem',
          position: 'relative'
        }}>
          <h2 style={{
            color: '#1e293b',
            fontSize: '1.5rem',
            fontWeight: '600',
            margin: '0 0 1rem 0'
          }}>
            Upload Product Image
          </h2>
          <p style={{
            color: '#64748b',
            fontSize: '0.9rem',
            margin: '0 0 2rem 0',
            lineHeight: '1.5'
          }}>
            Select or drag an image to extract GPS coordinates and product information
          </p>

          <label style={{ cursor: 'pointer' }}>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleChange} 
              style={{ display: 'none' }} 
            />
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '12px',
                padding: '3rem 2rem',
                textAlign: 'center',
                background: '#f8fafc',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.background = '#eff6ff';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#cbd5e1';
                e.target.style.background = '#f8fafc';
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                background: '#e2e8f0',
                borderRadius: '12px',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: '#64748b'
              }}>
                📷
              </div>
              <h3 style={{
                color: '#334155',
                fontSize: '1.1rem',
                fontWeight: '600',
                margin: '0 0 0.5rem 0'
              }}>
                Click or Drop Image Here
              </h3>
              <p style={{
                color: '#64748b',
                fontSize: '0.875rem',
                margin: 0
              }}>
                Supports JPG, PNG, GIF up to 10MB
              </p>
            </div>
          </label>

          {loading && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #e2e8f0',
                borderTop: '4px solid #3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '1rem'
              }}></div>
              <p style={{
                color: '#64748b',
                fontSize: '1rem',
                fontWeight: '500',
                margin: 0
              }}>
                Processing image...
              </p>
            </div>
          )}
        </div>

        {/* Image Preview */}
        {uploadedImage && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0',
            padding: '2.5rem',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#1e293b',
              fontSize: '1.25rem',
              fontWeight: '600',
              margin: '0 0 1.5rem 0'
            }}>
              Uploaded Image
            </h3>
            <img 
              src={uploadedImage} 
              alt="Uploaded product" 
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'contain',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}
            />
          </div>
        )}
      </div>

      {/* Results Section */}
      {!loading && (gps || originCountry || text) && (
        <div style={{
          maxWidth: '1200px',
          margin: '3rem auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          
          {/* GPS Coordinates */}
          {gps && (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e2e8f0',
              padding: '2rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#dbeafe',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem'
                }}>
                  <span style={{ color: '#3b82f6', fontSize: '1.25rem' }}>📍</span>
                </div>
                <h3 style={{
                  color: '#1e293b',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  margin: 0
                }}>
                  GPS Coordinates
                </h3>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{
                    color: '#64748b',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Latitude
                  </span>
                  <p style={{
                    color: '#1e293b',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    margin: '0.25rem 0 0 0',
                    fontFamily: 'monospace'
                  }}>
                    {gps.latitude.toFixed(5)}°
                  </p>
                </div>
                <div>
                  <span style={{
                    color: '#64748b',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Longitude
                  </span>
                  <p style={{
                    color: '#1e293b',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    margin: '0.25rem 0 0 0',
                    fontFamily: 'monospace'
                  }}>
                    {gps.longitude.toFixed(5)}°
                  </p>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps?q=${gps.latitude},${gps.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#3b82f6',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#2563eb';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#3b82f6';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Open in Google Maps
                <span style={{ marginLeft: '0.5rem' }}>→</span>
              </a>
            </div>
          )}

          {/* Country of Origin */}
          {originCountry && (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e2e8f0',
              padding: '2rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#dcfce7',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem'
                }}>
                  <span style={{ color: '#16a34a', fontSize: '1.25rem' }}>🌍</span>
                </div>
                <h3 style={{
                  color: '#1e293b',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  margin: 0
                }}>
                  Country of Origin
                </h3>
              </div>
              
              <div style={{
                background: '#f8fafc',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}>
                <span style={{
                  color: '#64748b',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Detected Country
                </span>
                <p style={{
                  color: '#1e293b',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  margin: '0.5rem 0 0 0'
                }}>
                  {originCountry}
                </p>
              </div>
            </div>
          )}

          {/* Extracted Text */}
          {text && (
            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              gridColumn: originCountry ? 'span 1' : 'span 2'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#fef3c7',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem'
                }}>
                  <span style={{ color: '#d97706', fontSize: '1.25rem' }}>📝</span>
                </div>
                <h3 style={{
                  color: '#1e293b',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  margin: 0
                }}>
                  Extracted Text
                </h3>
              </div>
              
              <div style={{
                background: '#f8fafc',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                <pre style={{
                  color: '#374151',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  margin: 0,
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word'
                }}>
                  {text}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer style={{
        maxWidth: '1200px',
        margin: '4rem auto 2rem',
        textAlign: 'center',
        padding: '2rem 0',
        borderTop: '1px solid #e2e8f0'
      }}>
        <p style={{
          color: '#64748b',
          fontSize: '0.875rem',
          margin: 0
        }}>
          © 2025 Product Verification System. All rights reserved.
        </p>
      </footer>

      {/* Animation Styles */}
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

export default PhotoGeoLocator;