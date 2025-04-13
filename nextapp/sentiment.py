from dotenv import load_dotenv
import os
import time
import requests
from polygon import RESTClient
import google.generativeai as genai
from flask import Flask, jsonify, request
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Store sentiment data
sentiment_data = []

load_dotenv()

# Configure APIs
POLYGON_API_KEY = os.getenv("POLYGON_API_KEY")
client = RESTClient(api_key=POLYGON_API_KEY)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

def analyze_sentiment(ticker, title, date):
    prompt = f"""Analyze this news headline regarding {ticker}. Respond with ONLY one word: 
Positive, Negative, or Neutral. Use Neutral if uncertain. No explanations or punctuation.

Headline: {title}
Date: {date}
Company: {ticker}"""
    try:
        response = model.generate_content(prompt)
        return response.text.strip().split()[0].capitalize()
    except Exception as e:
        print(f"AI Analysis Error: {e}", flush=True)
        return "Neutral"

@app.route('/api/sentiment', methods=['GET'])
def get_sentiment():
    return jsonify(sentiment_data)

def fetch_and_analyze_news():
    # Configuration
    ticker = "TSLA"
    start_date = "2025-03-01"
    end_date = "2025-04-12"

    try:
        # Fetch news articles
        news_articles = client.list_ticker_news(
            ticker, 
            params={
                "published_utc.gte": start_date,
                "published_utc.lt": end_date,
                "include_insights": "true"
            }, 
            order="desc", 
            limit=100
        )

        # Process articles with dual rate limiting
        for article in news_articles:
            try:
                sentiment = analyze_sentiment(
                    ticker,
                    article.title,
                    article.published_utc
                )
                # Append to our results list
                sentiment_data.append({
                    "title": article.title,
                    "date": article.published_utc,
                    "sentiment": sentiment
                })
            except Exception as e:
                print(f"Processing Error: {str(e)}", flush=True)
            # Rate limiting for both Polygon and Gemini
            time.sleep(12)

    except Exception as e:
        print(f"Critical Error: {str(e)}", flush=True)
        print("Waiting 60 seconds before retrying...", flush=True)
        time.sleep(60)

if __name__ == '__main__':
    # Start the news fetching in a separate thread
    import threading
    news_thread = threading.Thread(target=fetch_and_analyze_news)
    news_thread.daemon = True
    news_thread.start()
    
    # Run the Flask app
    app.run(host='0.0.0.0', port=5000) 