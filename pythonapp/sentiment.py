from dotenv import load_dotenv
import os
import time
import requests
from polygon import RESTClient
import google.generativeai as genai
from flask import Flask, jsonify, request
from flask_cors import CORS



load_dotenv()

# Configure APIs
POLYGON_API_KEY = os.getenv("POLYGON_API_KEY")
client = RESTClient(api_key=POLYGON_API_KEY)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

# In-memory storage for sentiment data (for simplicity)
sentiment_data_store = []

app = Flask(__name__)
CORS(app) 

@app.route('/api/sentiment', methods=['GET'])
def get_sentiment():
    return jsonify(sentiment_data_store)

@app.route('/api/sentiment', methods=['PUT'])
def receive_sentiment():
    global sentiment_data_store
    data = request.get_json()
    sentiment_data_store = data.get('articles', [])
    return jsonify({"message": "Sentiment data received successfully"}), 200

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

def process_and_store_sentiment():
    global sentiment_data_store
    ticker = "TSLA"
    start_date = "2025-03-01"
    end_date = "2025-04-12"
    results = []

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

        # Process articles
        for article in news_articles:
            try:
                sentiment = analyze_sentiment(
                    ticker,
                    article.title,
                    article.published_utc
                )
                results.append({
                    "title": article.title,
                    "date": article.published_utc,
                    "sentiment": sentiment
                })
                time.sleep(12)  # Rate limiting
            except Exception as e:
                print(f"Processing Error: {str(e)}", flush=True)

        # Store the results (will be served via GET)
        sentiment_data_store = results
        print(f"Successfully processed {len(results)} articles.")

    except Exception as e:
        print(f"Critical Error during data processing: {str(e)}", flush=True)

if __name__ == '__main__':
    # Process and store sentiment data initially
    process_and_store_sentiment()

    # Finally, run the Flask app to handle both GET and PUT requests
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=False)