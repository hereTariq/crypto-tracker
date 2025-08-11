import mongoose from 'mongoose';

const coinSchema = new mongoose.Schema({
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
    lastUpdated: {
        type: String,
        required: true
    }
});

const Coin = mongoose.model('Coin', coinSchema);
export default Coin;