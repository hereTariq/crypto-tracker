import { useState } from 'react';
import { FiArrowUp, FiArrowDown, FiRefreshCw, FiSearch, FiBarChart2 } from 'react-icons/fi';
import PriceChart from './PriceChart';

const Dashboard = ({ coins, loading, error, searchTerm, onSearchChange }) => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatMarketCap = (value) => {
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)} T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)} B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)} M`;
    return formatCurrency(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Top 10 Cryptocurrencies by Market Cap
        </h2>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search coins..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light sm:text-sm"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {selectedCoin && (
        <PriceChart
          coinId={selectedCoin.coinId}
          coinName={selectedCoin.name}
          onClose={() => setSelectedCoin(null)}
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <FiRefreshCw className="animate-spin text-4xl text-primary-light" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coin
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  24h Change
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Cap
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coins.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No coins found matching your search.
                  </td>
                </tr>
              ) : (
                coins.map((coin) => (
                  <tr key={coin.coinId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                          {coin.symbol}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{coin.name}</div>
                          <div className="text-sm text-gray-500">{coin.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(coin.price)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${coin.priceChange24h >= 0 ? 'text-success-light' : 'text-danger-light'}`}>
                      <div className="flex items-center">
                        {coin.priceChange24h >= 0 ? (
                          <FiArrowUp className="mr-1" />
                        ) : (
                          <FiArrowDown className="mr-1" />
                        )}
                        {Math.abs(coin.priceChange24h).toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatMarketCap(coin.marketCap)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(coin.lastUpdated).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedCoin(coin)}
                        className="flex items-center text-primary-light hover:text-primary-dark cursor-pointer"
                      >
                        <FiBarChart2 className="mr-1" />
                        View Chart
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;