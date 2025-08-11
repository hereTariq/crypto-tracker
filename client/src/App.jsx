import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { fetchCoinsData } from './api';


function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const response = await fetchCoinsData();
      setCoins(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching coins:', err);
      setError('Failed to fetch coin data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
    console.log('fetched using setInterval')
    // Auto-refresh every 30 minutes (1800000 ms)
    const interval = setInterval(fetchCoins, 1800000);
    console.log('interval: ', interval);
    
    return () => clearInterval(interval);
  }, []);

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Cryptocurrency Tracker
        </h1>
        
        <Dashboard 
          coins={filteredCoins} 
          loading={loading} 
          error={error}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>
    </div>
  );
}

export default App;