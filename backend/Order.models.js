const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    orderQuantity: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    typeOfProduct: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true,
        default : "John Doe"
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    estimatedDeliveryDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    specifications: {
        type: String,
        required: true,
        default : null
    },
    assignedTo: [{
        type: String,
        required: true
    }],
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    productCost : {
        type: Number,
        required: true,
        
    }
});

exports.Order = mongoose.model('Order', orderSchema);