import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
    coinId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    marketCap: {
        type: Number,
        required: true
    },
    priceChange24h: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const History = mongoose.model('History', historySchema);
export default History;