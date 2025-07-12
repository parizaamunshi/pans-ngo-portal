require('dotenv').config({ path: '../.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Order } = require('./Order.models'); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Debug: Check if environment variables are loaded
console.log('MONGODB_URL:', process.env.MONGODB_URL ? 'Loaded' : 'Not found');
console.log('PORT:', process.env.PORT);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Mongodb is connected");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get('/api/orderDetails', (req, res) => {
    try {
        console.log("Received request for order details");
        Order.find({})
            .then(orders => res.json(orders))
            .catch(err => res.status(500).json({ error: 'Failed to fetch orders', details: err }));
    } catch (error) {
        console.error("Error in /api/orderDetails:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
        
    }
})


app.post('/api/orderDetails', (req, res) => {
    try {
       const { orderQuantity, orderDate, typeOfProduct, customerName, deliveryAddress, estimatedDeliveryDate, specifications, assignedTo, status, productCost} = req.body;
        console.log("Received order data:", req.body);
        
        const newOrder = new Order({

            orderQuantity,
            orderDate,
            typeOfProduct,
            customerName,
            deliveryAddress,
            estimatedDeliveryDate,
            specifications,
            assignedTo,
            status: status || 'Pending', // Default to 'Pending' if not provided
            productCost

        });

        newOrder.save()
            .then(order => res.status(201).json(order))
            .catch(err => {
                console.error("Error saving order:", err);
                res.status(500).json({ error: 'Failed to save order', details: err });
            });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }})

app.update('/api/orderDetails/:id', (req, res) => {
    const orderId = req.params.id;
    const updateData = req.body;
    console.log(`Updating order with ID: ${orderId}`, updateData);
    Order.findByIdAndUpdate(orderId, updateData, { new: true })
        .then(updatedOrder => {
            if (!updatedOrder) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json(updatedOrder);
        })
        .catch(err => {
            console.error("Error updating order:", err);
            res.status(500).json({ error: 'Failed to update order', details: err });
        });
});