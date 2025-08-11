# Cryptocurrency Tracker (MERN Stack)

A full-stack application to track top cryptocurrencies with price history charts, built with:
- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Data Source**: CoinGecko API

## Features

- Real-time cryptocurrency price tracking
- Top 10 cryptocurrencies by market cap
- Interactive price history charts
- Auto-refreshing data (every 30 minutes)
- Historical price data storage
- Responsive design

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- CoinGecko API key (free tier works)

## Live URLs

### Backend API
```bash
https://crypto-tracker-nine-xi.vercel.app/
```

### Frontend
```bash
https://crypto-tracker-7cfj.vercel.app
```


## Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/hereTariq/crypto-tracker.git
cd crypto-tracker
```

### 2️⃣ Set Up Backend

```bash
cd server
```

#### Install Dependencies
```bash
yarn install
```

#### Configure Environment
Create a `.env` file inside the `server` directory:

```env
MONGODB_URI=mongodb://127.0.0.1:27017
DB_NAME = crypto-tracker
PORT=3009
CLIENT_URL=http://localhost:5173
```

#### Start Backend Server
```bash
yarn dev
```

✅ The backend will be running at: **[http://localhost:3009](http://localhost:3009)**

---

### 3️⃣ Set Up Frontend

```bash
In another terminal
cd client
```

#### Configure Environment
Create a `.env` file inside the `client` directory:

```env
VITE_BASE_URL=http://localhost:3009/api
```

#### Install Dependencies
```bash
yarn install
```

#### Start Development Server
```bash
yarn dev
```

### Cron Job Implementation
Schedule: Runs every hour (at minute 0)
Actions:
Fetches fresh data from CoinGecko API
Updates the "current prices" collection (overwrites)
Appends new records to the "history" collection
Logs success/errors to console

✅ The frontend will be running at: **[http://localhost:5173](http://localhost:5173)**


## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
