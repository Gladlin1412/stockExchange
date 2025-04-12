'use client';

import { useState, useEffect } from 'react';

export default function SentimentDisplay() {
  const [sentiments, setSentiments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/sentiment');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSentiments(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
        setError(`Error fetching data: ${error.message}`);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling every 12 seconds
    const interval = setInterval(fetchData, 12000);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <p>{error}</p>
        <p className="mt-2 text-sm">Make sure the server is running and the API endpoint is accessible.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sentiments.length === 0 ? (
        <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          No sentiment data available yet. Waiting for updates...
        </div>
      ) : (
        sentiments.map((sentiment, index) => (
          <div key={index} className="p-4 border rounded-lg shadow">
            <h3 className="text-lg font-semibold">{sentiment.title}</h3>
            <p className="text-gray-600">{new Date(sentiment.date).toLocaleString()}</p>
            <p className={`mt-2 ${
              sentiment.sentiment > 0 ? 'text-green-600' : 
              sentiment.sentiment < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              Sentiment: {sentiment.sentiment}
            </p>
          </div>
        ))
      )}
    </div>
  );
} 