import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import coinRoutes from './routes/coin.js'
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

connectDB();

// check
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', coinRoutes);

const PORT = process.env.PORT || 3009;

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));