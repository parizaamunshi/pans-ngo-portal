require('dotenv').config({ path: '../.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Order } = require('./Order.models'); 
const cluster= require('./cluster.models');// Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

const generateArtisan = (id) => ({
  artisan_id: id,
  artisan_name: `Artisan ${id}`,
  artisan_rating: Math.floor(Math.random() * 2) + 4,
  total_orders: Math.floor(Math.random() * 100),
  total_revenue: Math.floor(Math.random() * 10000),
  current_order: Math.floor(Math.random() * 3),
  amount_to_be_paid: Math.floor(Math.random() * 1000),
  skills: ['Pottery', 'Weaving', 'Woodwork'].sort(() => 0.5 - Math.random()).slice(0, 2),
  years_of_experience: Math.floor(Math.random() * 15)
});
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


app.put('/api/artisan/:clusterId/:artisanId', async (req, res) => {
    try {
        const { clusterId, artisanId } = req.params;
        
        const clusterData = await cluster.findOne({ cluster_id: clusterId });
        if (!clusterData) {
            return res.status(404).json({ message: "Cluster not found" });
        }
        
        const artisan = clusterData.artisans.id(artisanId);
        if (!artisan) {
            return res.status(404).json({ message: "Artisan not found" });
        }
        
        artisan.amountToBePaid = 0;
        
        await clusterData.save();
        
        res.json({ message: "Amount to be paid updated to 0", artisan });
    } catch (error) {
        console.error("Error updating artisan amount:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Payment processing endpoint
app.post('/api/clusters/:clusterId/pay', async (req, res) => {
    try {
        const { clusterId } = req.params;
        
        const clusterData = await cluster.findOne({ cluster_id: clusterId });
        if (!clusterData) {
            return res.status(404).json({ message: "Cluster not found" });
        }
        
        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update all artisans' payment status to 0 (indicating payment completed)
        clusterData.artisans.forEach(artisan => {
            artisan.amount_to_be_paid = 0;
        });
        
        await clusterData.save();
        
        res.json({ 
            message: "Payment processed successfully", 
            cluster_id: clusterId,
            total_artisans: clusterData.artisans.length 
        });
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ message: "Internal server error", details: error });
    }
});

// Populate sample payment data for testing
app.post('/api/populate-sample-data', async (req, res) => {
    try {
        // Create sample clusters with artisans and payment amounts
        const sampleClusters = [
            {
                cluster_id: 1,
                leader_id: 101,
                cluster_rating: 4.5,
                leader_rating: 4.8,
                order_id: null,
                artisans: [
                    {
                        artisan_id: 1001,
                        artisan_name: "Rajesh Kumar",
                        artisan_rating: 4.3,
                        total_orders: 25,
                        total_revenue: 125000,
                        current_order: 2,
                        amount_to_be_paid: 8500,
                        skills: ["Pottery", "Ceramic Work"],
                        years_of_experience: 8
                    },
                    {
                        artisan_id: 1002,
                        artisan_name: "Priya Sharma",
                        artisan_rating: 4.7,
                        total_orders: 32,
                        total_revenue: 156000,
                        current_order: 1,
                        amount_to_be_paid: 12000,
                        skills: ["Textiles", "Embroidery"],
                        years_of_experience: 12
                    },
                    {
                        artisan_id: 1003,
                        artisan_name: "Amit Singh",
                        artisan_rating: 4.1,
                        total_orders: 18,
                        total_revenue: 89000,
                        current_order: 3,
                        amount_to_be_paid: 6750,
                        skills: ["Wood Carving", "Furniture"],
                        years_of_experience: 6
                    }
                ]
            },
            {
                cluster_id: 2,
                leader_id: 102,
                cluster_rating: 4.2,
                leader_rating: 4.4,
                order_id: null,
                artisans: [
                    {
                        artisan_id: 2001,
                        artisan_name: "Sunita Devi",
                        artisan_rating: 4.6,
                        total_orders: 28,
                        total_revenue: 142000,
                        current_order: 2,
                        amount_to_be_paid: 9200,
                        skills: ["Jewelry", "Metalwork"],
                        years_of_experience: 10
                    },
                    {
                        artisan_id: 2002,
                        artisan_name: "Vikram Patel",
                        artisan_rating: 4.0,
                        total_orders: 22,
                        total_revenue: 108000,
                        current_order: 1,
                        amount_to_be_paid: 7800,
                        skills: ["Leather Work", "Bags"],
                        years_of_experience: 7
                    }
                ]
            },
            {
                cluster_id: 3,
                leader_id: 103,
                cluster_rating: 4.8,
                leader_rating: 4.9,
                order_id: null,
                artisans: [
                    {
                        artisan_id: 3001,
                        artisan_name: "Meera Joshi",
                        artisan_rating: 4.8,
                        total_orders: 35,
                        total_revenue: 175000,
                        current_order: 2,
                        amount_to_be_paid: 15000,
                        skills: ["Painting", "Canvas Art"],
                        years_of_experience: 15
                    },
                    {
                        artisan_id: 3002,
                        artisan_name: "Ramesh Gupta",
                        artisan_rating: 4.5,
                        total_orders: 30,
                        total_revenue: 148000,
                        current_order: 3,
                        amount_to_be_paid: 11500,
                        skills: ["Stone Carving", "Sculptures"],
                        years_of_experience: 13
                    },
                    {
                        artisan_id: 3003,
                        artisan_name: "Kavya Reddy",
                        artisan_rating: 4.4,
                        total_orders: 26,
                        total_revenue: 128000,
                        current_order: 1,
                        amount_to_be_paid: 8900,
                        skills: ["Handloom", "Sarees"],
                        years_of_experience: 9
                    },
                    {
                        artisan_id: 3004,
                        artisan_name: "Deepak Yadav",
                        artisan_rating: 4.2,
                        total_orders: 20,
                        total_revenue: 98000,
                        current_order: 2,
                        amount_to_be_paid: 7200,
                        skills: ["Bamboo Craft", "Home Decor"],
                        years_of_experience: 5
                    }
                ]
            }
        ];

        // Clear existing data and insert sample data
        await cluster.deleteMany({});
        await cluster.insertMany(sampleClusters);

        res.json({ 
            message: "Sample data populated successfully",
            clusters_created: sampleClusters.length,
            total_artisans: sampleClusters.reduce((sum, c) => sum + c.artisans.length, 0)
        });
    } catch (error) {
        console.error("Error populating sample data:", error);
        res.status(500).json({ message: "Internal server error", details: error });
    }
});
app.post("/admin", async (req,res) => {
    const {leader_id}=req.body
    const artisans = [];
      for (let j = 1; j <= 10; j++) {
        artisans.push(generateArtisan(i * 100 + j));
      }
    const newCluster= new cluster({
        cluster_id:leader_id,
        leader_id:leader_id,
        cluster_rating: +(Math.random() * 5).toFixed(1),
        leader_rating: +(Math.random() * 5).toFixed(1),
        order_id: null,
        artisans
    })
    await newCluster.save();
    res.json(newCluster);
    console.log("New leader added");
})
app.delete("/admin",async (req,res)=>{
    const {leader_id}=req.body;
    await cluster.deleteOne({leader_id:leader_id});
    res.json("Leader deleted");
    console.log("Leader deleted");
})

