'use client';

import { useState, useEffect } from 'react';

export default function SentimentDisplay() {
  const [sentiments, setSentiments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/analyze_sentiment:5000');
        const data = await response.json();
        setSentiments(data);
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling every 12 seconds
    const interval = setInterval(fetchData, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {sentiments.map((sentiment, index) => (
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
      ))}
    </div>
  );
} 