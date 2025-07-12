require('dotenv').config(); // Load .env variables
const mongoose = require('mongoose');
const Cluster = require('./cluster.models'); // 🔁 Replace with actual path

mongoose.connect("mongodb+srv://team60:Team60@cluster0.4jeftsz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("✅ MongoDB is connected");
    seedClusters(); // Call the seeding function after connection
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });

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

const seedClusters = async () => {
  try {
    await Cluster.deleteMany({}); // optional: clear existing

    const clusters = [];

    for (let i = 1; i <= 3; i++) {
      const artisans = [];
      for (let j = 1; j <= 10; j++) {
        artisans.push(generateArtisan(i * 100 + j));
      }

      clusters.push({
        cluster_id: i,
        leader_id: i * 10,
        cluster_rating: +(Math.random() * 5).toFixed(1),
        leader_rating: +(Math.random() * 5).toFixed(1),
        order_id: null,
        artisans
      });
    }

    await Cluster.insertMany(clusters);
    console.log("🎉 Dummy clusters with artisans inserted.");
  } catch (err) {
    console.error("❌ Error inserting dummy data:", err);
  } finally {
    mongoose.disconnect();
  }
};
