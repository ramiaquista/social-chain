'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface CoinData {
  id: string;
  symbol: string;
  current_price: number;
  image: string;
}

export function CryptoHeader() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const coinsPerPage = 3; // Reduced for mobile

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 50, // Fetch more coins
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };

    fetchCoinData();
    const interval = setInterval(fetchCoinData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const totalPages = Math.ceil(coins.length / coinsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const displayedCoins = coins.slice(
    currentPage * coinsPerPage,
    (currentPage + 1) * coinsPerPage
  );

  return (
    <header className="bg-gray-900 text-white py-2 px-4 w-full overflow-hidden relative">
      <div className="flex justify-between items-center pl-12 lg:pl-0">
        <button
          onClick={prevPage}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 lg:h-6 lg:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="flex space-x-2 lg:space-x-4 overflow-x-auto">
          {displayedCoins.map((coin) => (
            <motion.div
              key={coin.id}
              className="flex items-center whitespace-nowrap text-xs lg:text-base"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-blue-600 rounded-full p-1 mr-1 lg:mr-2">
                <img
                  src={coin.image}
                  alt={coin.symbol}
                  className="w-4 h-4 lg:w-6 lg:h-6"
                  onError={(e) => {
                    e.currentTarget.src = `https://cryptoicons.org/api/icon/${coin.symbol.toLowerCase()}/25`;
                  }}
                />
              </div>
              <span className="uppercase font-semibold text-blue-400">
                {coin.symbol}:
              </span>
              <motion.span
                className="ml-1 font-mono text-green-400"
                key={coin.current_price}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                ${coin.current_price.toFixed(2)}
              </motion.span>
            </motion.div>
          ))}
        </div>
        <button
          onClick={nextPage}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 lg:h-6 lg:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
