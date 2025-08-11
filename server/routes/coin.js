import { Router } from 'express';
import { getCoinData, getHistoryDataByCoin, saveHistoryRecords } from '../controllers/coin.js';

const router = Router();

router.get('/coins', getCoinData);
router.post('/history', saveHistoryRecords);
router.get('/history/:coinId', getHistoryDataByCoin);

export default router;