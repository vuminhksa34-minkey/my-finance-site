from flask import Flask, jsonify
import yfinance as yf
from flask_cors import CORS

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

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
