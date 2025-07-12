require('dotenv').config({ path: '../.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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