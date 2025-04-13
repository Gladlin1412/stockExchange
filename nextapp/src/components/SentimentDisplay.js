'use client';

import { useState, useEffect } from 'react';

export default function SentimentDisplay() {
  const [sentiments, setSentiments] = useState([
    {
      title: "Can Tesla Stock Reach $1,000 by 2030?",
      date: "2024-03-31T13:27:00Z",
      sentiment: "Neutral"
    },
    {
      title: "Wall Street Breakfast: The Week Ahead",
      date: "2024-03-31T11:38:40Z",
      sentiment: "Neutral"
    },
    {
      title: "Some Skeptics Say Crypto Is Too Expensive. I Disagree, and Here's Why.",
      date: "2024-03-31T11:30:00Z",
      sentiment: "Neutral"
    }
  ]);

  return (
    <div className="space-y-4">
      {sentiments.map((sentiment, index) => (
        <div key={index} className="p-4 border rounded-lg shadow bg-white">
          <h3 className="text-lg font-semibold text-gray-800">{sentiment.title}</h3>
          <p className="text-gray-500">{new Date(sentiment.date).toLocaleString()}</p>
          <p className={`mt-2 font-medium ${
            sentiment.sentiment === "Positive" ? 'text-green-500' : 
            sentiment.sentiment === "Negative" ? 'text-red-500' : 'text-blue-500'
          }`}>
            Sentiment: {sentiment.sentiment}
          </p>
        </div>
      ))}
    </div>
  );
} 