import React, { useState, useEffect } from 'react';
import './Feedback.css';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const navigate = useNavigate();
  const [selectedFeedbacks, setSelectedFeedbacks] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [showReplyBox, setShowReplyBox] = useState({});
  const [repliedFeedbacks, setRepliedFeedbacks] = useState({});

  // Array of 30 hardcoded feedbacks
  const allFeedbacks = [
    { id: 1, orderId: 'ORD-001', customer: 'Rajesh Kumar', rating: 5, comment: 'Excellent quality products! Very satisfied with the craftsmanship.', date: '2025-01-15', status: 'positive' },
    { id: 2, orderId: 'ORD-002', customer: 'Priya Sharma', rating: 2, comment: 'Product was damaged during delivery. Packaging needs improvement.', date: '2025-01-14', status: 'negative' },
    { id: 3, orderId: 'ORD-003', customer: 'Amit Singh', rating: 4, comment: 'Good quality but delivery was delayed by 3 days.', date: '2025-01-13', status: 'neutral' },
    { id: 4, orderId: 'ORD-004', customer: 'Sunita Devi', rating: 5, comment: 'Beautiful handmade items. Will definitely order again!', date: '2025-01-12', status: 'positive' },
    { id: 5, orderId: 'ORD-005', customer: 'Vikram Patel', rating: 3, comment: 'Average quality. Expected better for the price paid.', date: '2025-01-11', status: 'neutral' },
    { id: 6, orderId: 'ORD-006', customer: 'Meera Joshi', rating: 5, comment: 'Outstanding work! The attention to detail is remarkable.', date: '2025-01-10', status: 'positive' },
    { id: 7, orderId: 'ORD-007', customer: 'Ramesh Gupta', rating: 1, comment: 'Very poor quality. Product broke within a week of use.', date: '2025-01-09', status: 'negative' },
    { id: 8, orderId: 'ORD-008', customer: 'Kavya Reddy', rating: 4, comment: 'Nice product overall. Minor color variation from what was shown.', date: '2025-01-08', status: 'neutral' },
    { id: 9, orderId: 'ORD-009', customer: 'Deepak Yadav', rating: 5, comment: 'Perfect! Exactly what I was looking for. Great job!', date: '2025-01-07', status: 'positive' },
    { id: 10, orderId: 'ORD-010', customer: 'Anita Das', rating: 2, comment: 'Product quality is below expectations. Size was also incorrect.', date: '2025-01-06', status: 'negative' },
    { id: 11, orderId: 'ORD-011', customer: 'Rohit Mehta', rating: 4, comment: 'Good craftsmanship. Fast delivery and secure packaging.', date: '2025-01-05', status: 'neutral' },
    { id: 12, orderId: 'ORD-012', customer: 'Sita Kumari', rating: 5, comment: 'Absolutely loved the traditional design! Highly recommended.', date: '2025-01-04', status: 'positive' },
    { id: 13, orderId: 'ORD-013', customer: 'Manoj Tiwari', rating: 3, comment: 'Decent product but could be better. Price is reasonable.', date: '2025-01-03', status: 'neutral' },
    { id: 14, orderId: 'ORD-014', customer: 'Pooja Agarwal', rating: 1, comment: 'Terrible experience. Product was completely different from description.', date: '2025-01-02', status: 'negative' },
    { id: 15, orderId: 'ORD-015', customer: 'Kiran Verma', rating: 4, comment: 'Very good quality and finish. Slight delay in delivery.', date: '2025-01-01', status: 'neutral' },
    { id: 16, orderId: 'ORD-016', customer: 'Suresh Pandey', rating: 5, comment: 'Exceptional quality! The artisans are truly skilled.', date: '2024-12-31', status: 'positive' },
    { id: 17, orderId: 'ORD-017', customer: 'Renu Malhotra', rating: 2, comment: 'Not satisfied with the color quality. Faded quickly.', date: '2024-12-30', status: 'negative' },
    { id: 18, orderId: 'ORD-018', customer: 'Arun Jain', rating: 4, comment: 'Good value for money. Well-made product.', date: '2024-12-29', status: 'neutral' },
    { id: 19, orderId: 'ORD-019', customer: 'Geeta Devi', rating: 5, comment: 'Beautiful work! My family loves it. Thank you!', date: '2024-12-28', status: 'positive' },
    { id: 20, orderId: 'ORD-020', customer: 'Vinod Kumar', rating: 3, comment: 'Okay product. Nothing special but does the job.', date: '2024-12-27', status: 'neutral' },
    { id: 21, orderId: 'ORD-021', customer: 'Lakshmi Nair', rating: 1, comment: 'Very disappointed. Product arrived broken and unusable.', date: '2024-12-26', status: 'negative' },
    { id: 22, orderId: 'ORD-022', customer: 'Ravi Prakash', rating: 5, comment: 'Superb quality! Exceeded my expectations completely.', date: '2024-12-25', status: 'positive' },
    { id: 23, orderId: 'ORD-023', customer: 'Shanti Sharma', rating: 4, comment: 'Good product with nice finishing. Recommended.', date: '2024-12-24', status: 'neutral' },
    { id: 24, orderId: 'ORD-024', customer: 'Mukesh Goel', rating: 2, comment: 'Poor packaging led to damage. Product quality is average.', date: '2024-12-23', status: 'negative' },
    { id: 25, orderId: 'ORD-025', customer: 'Radha Krishnan', rating: 5, comment: 'Fantastic! The traditional craftsmanship is evident.', date: '2024-12-22', status: 'positive' },
    { id: 26, orderId: 'ORD-026', customer: 'Sunil Yadav', rating: 3, comment: 'Average experience. Product is okay for the price.', date: '2024-12-21', status: 'neutral' },
    { id: 27, orderId: 'ORD-027', customer: 'Neha Chopra', rating: 4, comment: 'Very satisfied with the purchase. Quick delivery too.', date: '2024-12-20', status: 'neutral' },
    { id: 28, orderId: 'ORD-028', customer: 'Ashok Thakur', rating: 1, comment: 'Worst quality product. Complete waste of money.', date: '2024-12-19', status: 'negative' },
    { id: 29, orderId: 'ORD-029', customer: 'Savita Singh', rating: 5, comment: 'Amazing quality and design! Will order more items soon.', date: '2024-12-18', status: 'positive' },
    { id: 30, orderId: 'ORD-030', customer: 'Dilip Saxena', rating: 4, comment: 'Good product overall. Satisfied with the purchase.', date: '2024-12-17', status: 'neutral' }
  ];

  // Randomly select 5 feedbacks on component mount
  useEffect(() => {
    const getRandomFeedbacks = () => {
      const shuffled = [...allFeedbacks].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 5);
    };
    setSelectedFeedbacks(getRandomFeedbacks());
  }, []);

  const handleRefresh = () => {
    const shuffled = [...allFeedbacks].sort(() => 0.5 - Math.random());
    setSelectedFeedbacks(shuffled.slice(0, 5));
    setReplyText({});
    setShowReplyBox({});
    setRepliedFeedbacks({});
  };

  const handleReplyToggle = (feedbackId) => {
    setShowReplyBox(prev => ({
      ...prev,
      [feedbackId]: !prev[feedbackId]
    }));
  };

  const handleReplyChange = (feedbackId, text) => {
    setReplyText(prev => ({
      ...prev,
      [feedbackId]: text
    }));
  };

  const handleReplySubmit = (feedbackId) => {
    if (replyText[feedbackId]?.trim()) {
      setRepliedFeedbacks(prev => ({
        ...prev,
        [feedbackId]: replyText[feedbackId]
      }));
      setShowReplyBox(prev => ({
        ...prev,
        [feedbackId]: false
      }));
      setReplyText(prev => ({
        ...prev,
        [feedbackId]: ''
      }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'positive': return '#38a169';
      case 'negative': return '#e53e3e';
      case 'neutral': return '#d69e2e';
      default: return '#4a5568';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'positive': return '#f0fff4';
      case 'negative': return '#fed7d7';
      case 'neutral': return '#fef5e7';
      default: return '#f7fafc';
    }
  };

  const getRatingStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: '0 0 0.5rem 0', color: '#2d3748', fontSize: '2rem', fontWeight: '700' }}>
              Customer Feedback
            </h1>
            <p style={{ margin: 0, color: '#718096', fontSize: '1.1rem' }}>
              Review and respond to customer feedback from recent orders
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={handleRefresh}
              style={{
                background: '#3182ce',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#2c5aa0'}
              onMouseLeave={(e) => e.target.style.background = '#3182ce'}
            >
              <span style={{ fontSize: '1.2rem' }}>🔄</span>
              Refresh Feedbacks
            </button>
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
              ← Back
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#4a5568', fontSize: '0.9rem', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Total Feedbacks</h3>
          <span style={{ display: 'block', fontSize: '2rem', fontWeight: '800', color: '#3182ce', margin: 0 }}>{allFeedbacks.length}</span>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#4a5568', fontSize: '0.9rem', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Showing</h3>
          <span style={{ display: 'block', fontSize: '2rem', fontWeight: '800', color: '#38a169', margin: 0 }}>{selectedFeedbacks.length}</span>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#4a5568', fontSize: '0.9rem', margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Replied</h3>
          <span style={{ display: 'block', fontSize: '2rem', fontWeight: '800', color: '#d69e2e', margin: 0 }}>{Object.keys(repliedFeedbacks).length}</span>
        </div>
      </div>

      {/* Feedback Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {selectedFeedbacks.length === 0 ? (
          <div style={{ 
            background: 'white', 
            padding: '3rem', 
            borderRadius: '12px', 
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ color: '#4a5568', margin: '0 0 1rem 0' }}>Loading Feedbacks...</h3>
            <p style={{ color: '#718096', margin: 0 }}>Please wait while we load customer feedback.</p>
          </div>
        ) : (
          selectedFeedbacks.map((feedback) => (
            <div 
              key={feedback.id} 
              style={{ 
                background: 'white', 
                borderRadius: '12px', 
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden'
              }}
            >
              {/* Feedback Header */}
              <div style={{ 
                background: getStatusBg(feedback.status),
                padding: '1.5rem',
                borderBottom: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#2d3748', fontSize: '1.2rem', fontWeight: '600' }}>
                      Order: {feedback.orderId}
                    </h3>
                    <p style={{ margin: 0, color: '#4a5568', fontSize: '1rem' }}>
                      Customer: <strong>{feedback.customer}</strong>
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      color: getStatusColor(feedback.status), 
                      fontSize: '1.5rem', 
                      marginBottom: '0.25rem' 
                    }}>
                      {getRatingStars(feedback.rating)}
                    </div>
                    <span style={{ 
                      color: '#718096', 
                      fontSize: '0.9rem' 
                    }}>
                      {new Date(feedback.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.7)', 
                  padding: '1rem', 
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 0, 0, 0.1)'
                }}>
                  <p style={{ margin: 0, color: '#2d3748', fontSize: '1rem', lineHeight: '1.5' }}>
                    "{feedback.comment}"
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ padding: '1.5rem' }}>
                {repliedFeedbacks[feedback.id] ? (
                  <div style={{ 
                    background: '#f0fff4', 
                    padding: '1rem', 
                    borderRadius: '8px',
                    border: '1px solid #9ae6b4'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#38a169', fontSize: '1.2rem' }}>✓</span>
                      <strong style={{ color: '#38a169' }}>Your Reply:</strong>
                    </div>
                    <p style={{ margin: 0, color: '#2d3748', fontStyle: 'italic' }}>
                      "{repliedFeedbacks[feedback.id]}"
                    </p>
                  </div>
                ) : (
                  <div>
                    {!showReplyBox[feedback.id] ? (
                      <button
                        onClick={() => handleReplyToggle(feedback.id)}
                        style={{
                          background: '#38a169',
                          color: 'white',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#2f855a'}
                        onMouseLeave={(e) => e.target.style.background = '#38a169'}
                      >
                        <span style={{ fontSize: '1.2rem' }}>💬</span>
                        Reply to Customer
                      </button>
                    ) : (
                      <div style={{ 
                        background: '#f7fafc', 
                        padding: '1.5rem', 
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div style={{ marginBottom: '1rem' }}>
                          <label style={{ 
                            display: 'block', 
                            color: '#4a5568', 
                            fontSize: '0.9rem', 
                            fontWeight: '600',
                            marginBottom: '0.5rem'
                          }}>
                            Your Response:
                          </label>
                          <textarea
                            value={replyText[feedback.id] || ''}
                            onChange={(e) => handleReplyChange(feedback.id, e.target.value)}
                            placeholder="Type your response to the customer..."
                            style={{
                              width: '100%',
                              minHeight: '100px',
                              padding: '1rem',
                              border: '1px solid #e2e8f0',
                              borderRadius: '8px',
                              fontSize: '1rem',
                              fontFamily: 'inherit',
                              resize: 'vertical',
                              outline: 'none',
                              transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3182ce'}
                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                          />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <button
                            onClick={() => handleReplySubmit(feedback.id)}
                            disabled={!replyText[feedback.id]?.trim()}
                            style={{
                              background: replyText[feedback.id]?.trim() ? '#38a169' : '#e2e8f0',
                              color: replyText[feedback.id]?.trim() ? 'white' : '#a0aec0',
                              border: 'none',
                              padding: '0.75rem 1.5rem',
                              borderRadius: '8px',
                              cursor: replyText[feedback.id]?.trim() ? 'pointer' : 'not-allowed',
                              fontSize: '1rem',
                              fontWeight: '500',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              if (replyText[feedback.id]?.trim()) {
                                e.target.style.background = '#2f855a';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (replyText[feedback.id]?.trim()) {
                                e.target.style.background = '#38a169';
                              }
                            }}
                          >
                            <span style={{ fontSize: '1.2rem' }}>📨</span>
                            Send Reply
                          </button>
                          <button
                            onClick={() => handleReplyToggle(feedback.id)}
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
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feedback;

