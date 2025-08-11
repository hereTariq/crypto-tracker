import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchCoinsData = async () => {
    const response = await axios.get(`${BASE_URL}/coins`);
    return response.data;
}

export const fetchCoinsHistoryByCoinId = async (coinId) => {
    const response = await axios.get(`${BASE_URL}/history/${coinId}`);
    return response.data
}