import React from 'react';

function OrderDetails({ order }) {
  return (
    <div className="order-details" style={{ border: '1px solid #aaa', borderRadius: 6, padding: '1rem', margin: '1rem 0' }}>
      <h3>Order Details</h3>
      <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: 400 }}>
        <li><strong>Order Quantity:</strong> {order.OrderQuantity}</li>
        <li><strong>Order Date:</strong> {order.orderDate}</li>
        <li><strong>Type of Product:</strong> {order.TypeofProd}</li>
        <li><strong>Customer Name:</strong> {order.customerName}</li>
        <li><strong>Delivery Address:</strong> {order.deliverAddress}</li>
        <li><strong>Estimated Delivery Date:</strong> {order.estimatedDeliveryDate}</li>
        <li><strong>Specifications:</strong> {order.Specifications}</li>
        <li><strong>Status:</strong> {order.status}</li>
        <li><strong>Product Cost:</strong> ₹{order.productcost}</li>
      </ul>
    </div>
  );
}

export default OrderDetails;
