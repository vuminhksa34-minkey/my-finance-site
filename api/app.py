from flask import Flask, jsonify
import yfinance as yf
from flask_cors import CORS
import feedparser

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

@app.route('/api/market-data')
def get_market_data():
    data = {}
    try:
        # S&P 500
        sp500 = yf.Ticker("^GSPC")
        sp500_info = sp500.info
        data["sp500"] = {
            "price": sp500_info.get("regularMarketPrice"),
            "change": sp500_info.get("regularMarketChangePercent"),
        }
    except Exception as e:
        print(f"Error fetching S&P 500: {e}")
        data["sp500"] = {"price": "N/A", "change": "N/A"}

    try:
        # Nasdaq
        nasdaq = yf.Ticker("^IXIC")
        nasdaq_info = nasdaq.info
        data["nasdaq"] = {
            "price": nasdaq_info.get("regularMarketPrice"),
            "change": nasdaq_info.get("regularMarketChangePercent"),
        }
    except Exception as e:
        print(f"Error fetching Nasdaq: {e}")
        data["nasdaq"] = {"price": "N/A", "change": "N/A"}

    try:
        # USD/VND
        usdvnd = yf.Ticker("USDVND=X")
        usdvnd_info = usdvnd.info
        data["usdVnd"] = {
            "price": usdvnd_info.get("regularMarketPrice"),
            "change": usdvnd_info.get("regularMarketChangePercent"),
        }
    except Exception as e:
        print(f"Error fetching USD/VND: {e}")
        data["usdVnd"] = {"price": "N/A", "change": "N/A"}

    try:
        # Bitcoin (BTC-USD)
        bitcoin = yf.Ticker("BTC-USD")
        bitcoin_info = bitcoin.info
        data["bitcoin"] = {
            "price": bitcoin_info.get("regularMarketPrice"),
            "change": bitcoin_info.get("regularMarketChangePercent"),
        }
    except Exception as e:
        print(f"Error fetching Bitcoin: {e}")
        data["bitcoin"] = {"price": "N/A", "change": "N/A"}

    try:
        # VN-Index
        vnindex = yf.Ticker("^VNINDEX.VN")
        vnindex_info = vnindex.info
        data["vnindex"] = {
            "price": vnindex_info.get("regularMarketPrice"),
            "change": vnindex_info.get("regularMarketChangePercent"),
        }
    except Exception as e:
        print(f"Error fetching VN-Index: {e}")
        data["vnindex"] = {"price": "N/A", "change": "N/A"}

    return jsonify(data)

@app.route('/api/news-data')
def get_news_data():
    try:
        feed = feedparser.parse('https://vnexpress.net/rss/kinh-doanh.rss')
        news_items = []
        for entry in feed.entries:
            news_items.append({
                "title": entry.title,
                "link": entry.link,
                "contentSnippet": entry.summary # or entry.description
            })
        return jsonify({"items": news_items})
    except Exception as e:
        print(f"Error fetching news: {e}")
        return jsonify({"error": "Failed to fetch news"}), 500
