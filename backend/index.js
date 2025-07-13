require('dotenv').config({ path: '../.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Order } = require('./Order.models'); 
const cluster= require('./cluster.models');// Adjust the path as necessary

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
            .then(orders => res.status(200).json(orders))
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
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }})

app.put('/api/orderDetails/:id', (req, res) => {
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

app.get('/feedback/:id', async (req, res) => {
    const cluster_id = req.params.id;
    console.log("Received request for feedback details", cluster_id);
    console.log(cluster_id)
    try {
        const clusterData = await cluster.findOne({ cluster_id: cluster_id });
        if (!clusterData) {
            return res.status(404).json({ message: "Cluster not found" });
        }
        artisans=clusterData.artisans;
        res.json(artisans);
        console.log(artisans);
    } catch (error) {
        console.error("Error fetching cluster:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.get('/api/clusters', async (req, res) => {
    try {
        const clusters = await cluster.find({});
        res.json(clusters);
    } catch (error) {
        console.error("Error fetching clusters:", error);
        res.status(500).json({ message: "Internal server error" , details: error });
    }
})
app.get('/api/artisan/:id', async (req, res) => {
    const cluster_id = req.params.id;
    console.log("Received request for feedback details");
    console.log(cluster_id)
    try {
        const clusterData = await cluster.findOne({ cluster_id: cluster_id });
        if (!clusterData) {
            return res.status(404).json({ message: "Cluster not found" });
        }
        res.json(clusterData.artisans);
    } catch (error) {
        console.error("Error fetching cluster:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

