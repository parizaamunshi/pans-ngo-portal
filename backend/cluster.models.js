const mongoose = require('mongoose');
const artisanSchema = new mongoose.Schema({
    artisan_id: {
        type: Number,
        required: true,
        unique: true,

    },
    artisan_name:{
        type: String,
        required: true
    },
    artisan_rating: {
        type: Number,
        required: true,
        default: 5
    },
    total_orders: {
        type: Number,
        required: true,
        default:0
    },
    total_revenue: {
        type: Number,
        required: true,
        default:0
    },
    current_order:{
        type:Number,
        required: true,
        default:0
    },
    amount_to_be_paid:{
        type:Number,
        required: true,
        default:0
    },
    skills:{
        type:[String],
        require:false
    },
    years_of_experience:{
        type: Number,
        require: true,
        default:0
    }
})


const clusterSchema = new mongoose.Schema({
    cluster_id: {
        type:Number,
        required: true,
        unique: true
    },
    leader_id:{
        type: Number,
        required: true
    },
    cluster_rating:{
        type: Number,
        require: true
    },
    leader_rating:{
        type: Number,
        require: true
    },
    order_id:{
        type: Number,
        default:null
    }
    ,
    artisans:[artisanSchema]

});

const cluster = mongoose.model('Cluster', clusterSchema);
module.exports = cluster