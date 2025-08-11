import axios from 'axios';
import cron from 'node-cron';
import Coin from "../models/coin.js"
import History from "../models/history.js"

const api = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1'
export const getCoinData = async (req, res) => {
    try {
        const coins = await Coin.find().sort({ marketCap: -1 }).limit(10);

        if (coins.length > 0) {
            return res.status(200).json({ status: true, message: "coins fetched successfully.", data: coins });
        }

        const response = await axios.get(api);

        const coinData = response.data.map(coin => ({
            coinId: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            price: coin.current_price,
            marketCap: coin.market_cap,
            priceChange24h: coin.price_change_percentage_24h,
            lastUpdated: coin.last_updated
        }));

        await Coin.deleteMany({});
        await Coin.insertMany(coinData);

        res.status(200).json({ status: true, message: "coins fetched successfully.", data: coinData });
    } catch (error) {
        console.error('Error fetching coins:', error);
        res.status(500).json({ status: false, error: 'Failed to fetch coin data' });
    }
}

export const saveHistoryRecords = async (req, res) => {
    try {
        const coins = await Coin.find().limit(10);
        const historyRecords = coins.map(coin => ({
            coinId: coin.coinId,
            name: coin.name,
            symbol: coin.symbol,
            price: coin.price,
            marketCap: coin.marketCap,
            priceChange24h: coin.priceChange24h,
            timestamp: new Date()
        }));

        await History.insertMany(historyRecords);
        res.status(201).json({ status: true, message: 'History snapshot saved successfully' });
    } catch (error) {
        console.error('Error saving history:', error);
        res.status(500).json({ status: false, message: 'Failed to save history' });
    }
}

export const getHistoryDataByCoin = async (req, res) => {
    try {
        const { coinId } = req.params;
        const history = await History.find({ coinId }).sort({ timestamp: -1 }).limit(24);
        const formattedHistory = history.map(item => ({
            price: item.price,
            timestamp: item.timestamp,
            priceChange24h: item.priceChange24h
        }));
        res.status(200).json({ status: true, message: "coin fetched successfully.", data: formattedHistory });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ status: false, message: 'Failed to fetch history' });
    }
}

const updateCoins = async () => {
    try {
        console.log('Running hourly update...');

        const response = await axios.get(api);

        const coinData = response.data.map(coin => ({
            coinId: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            price: coin.current_price,
            marketCap: coin.market_cap,
            priceChange24h: coin.price_change_percentage_24h,
            lastUpdated: coin.last_updated
        }));

        await Coin.deleteMany({});
        await Coin.insertMany(coinData);

        const historyRecords = coinData.map(coin => ({
            ...coin,
            timestamp: new Date()
        }));
        await History.insertMany(historyRecords);

        console.log('Hourly update completed successfully');
    } catch (error) {
        console.error('Error in hourly update:', error);
    }
}

cron.schedule("0 * * * *", async () => {
    await updateCoins();
})