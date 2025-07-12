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
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    estimatedDeliveryDate: {
        type: Date,
        required: true
    },
    specifications: {
        type: String,
        required: true
    },
    assignedTo: [{
        type: String,
        required: true
    }],
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Pending'
    }
});

exports.Order = mongoose.model('Order', orderSchema);