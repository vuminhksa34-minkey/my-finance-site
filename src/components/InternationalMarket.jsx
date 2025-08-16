
import { useEffect, useState } from "react";

export default function InternationalMarket() {
  const [data, setData] = useState(null);
  const API_KEY = "K2HHUTXWWEJMZQL5";

  useEffect(() => {
    const fetchData = async () => {
      const usdVndPromise = fetch(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=VND&apikey=${API_KEY}`
      ).then(res => res.json());

      const btcUsdPromise = fetch(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=${API_KEY}`
      ).then(res => res.json());

      const [usdVndResult, btcUsdResult] = await Promise.allSettled([
        usdVndPromise,
        btcUsdPromise,
      ]);

      const newData = {
        sp500: {
          price: "4418.23", // Static for now
          change: "+1.11%", // Static for now
          chart: "up",
        },
        nasdaq: {
          price: "13743.61", // Static for now
          change: "+1.70%", // Static for now
          chart: "up",
        },
        usdVnd: {
          price: "24210",
          change: "+0.25%",
          chart: "up",
        },
        bitcoin: {
          price: "60000",
          change: "+1.50%",
          chart: "up",
        },
      };

      if (usdVndResult.status === "fulfilled" && usdVndResult.value["Realtime Currency Exchange Rate"]) {
        const usdVndRate = usdVndResult.value["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
        newData.usdVnd.price = parseFloat(usdVndRate).toFixed(2);
      } else {
        console.error("Failed to fetch USD/VND data:", usdVndResult.reason);
      }

      if (btcUsdResult.status === "fulfilled" && btcUsdResult.value["Realtime Currency Exchange Rate"]) {
        const btcUsdRate = btcUsdResult.value["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
        newData.bitcoin.price = parseFloat(btcUsdRate).toFixed(2);
      } else {
        console.error("Failed to fetch Bitcoin data:", btcUsdResult.reason);
      }

      setData(newData);
    };

    fetchData();
  }, []);

  if (!data) return <div>Đang tải dữ liệu...</div>;

  const renderChart = (type) => {
    const color = type === "up" ? "text-green-400" : "text-red-400";
    return (
      <svg width="80" height="25" className={`inline-block ml-4 ${color}`}>
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={
            type === "up"
              ? "0,20 8,16 16,18 24,12 32,14 40,8 48,10 56,6 64,8 72,4 80,6"
              : "0,6 8,10 16,8 24,14 32,12 40,18 48,16 56,20 64,18 72,22 80,20"
          }
        />
      </svg>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-base font-semibold">S&P 500</div>
          <div className="text-xl font-bold">{data.sp500.price}</div>
        </div>
        <div className="flex items-center">
          <div className={`text-base font-bold ${data.sp500.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{data.sp500.change}</div>
          {renderChart(data.sp500.chart)}
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-base font-semibold">Nasdaq</div>
          <div className="text-xl font-bold">{data.nasdaq.price}</div>
        </div>
        <div className="flex items-center">
          <div className={`text-base font-bold ${data.nasdaq.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{data.nasdaq.change}</div>
          {renderChart(data.nasdaq.chart)}
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-base font-semibold">USD/VND</div>
          <div className="text-xl font-bold">{data.usdVnd.price}</div>
        </div>
        <div className="flex items-center">
          <div className={`text-base font-bold ${data.usdVnd.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{data.usdVnd.change}</div>
          {renderChart(data.usdVnd.chart)}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-base font-semibold">Bitcoin (BTC)</div>
          <div className="text-xl font-bold">{data.bitcoin.price}</div>
        </div>
        <div className="flex items-center">
          <div className={`text-base font-bold ${data.bitcoin.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{data.bitcoin.change}</div>
          {renderChart(data.bitcoin.chart)}
        </div>
      </div>
    </div>
  );
}
