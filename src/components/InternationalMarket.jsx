
import { useEffect, useState } from "react";

export default function InternationalMarket() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setData({
      sp500: {
        price: "4418.23",
        change: "+1.11%",
        chart: "up",
      },
      nasdaq: {
        price: "13743.61",
        change: "+1.70%",
        chart: "up",
      },
      usdVnd: {
        price: "24210",
        change: "+0.25%",
        chart: "up",
      },
    });
  }, []);

  if (!data) return <div>Đang tải dữ liệu...</div>;

  const renderChart = (type) => {
    const color = type === "up" ? "text-green-400" : "text-red-400";
    return (
      <svg width="100" height="30" className={`inline-block ml-4 ${color}`}>
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={
            type === "up"
              ? "0,25 10,20 20,22 30,15 40,17 50,10 60,12 70,8 80,10 90,5 100,8"
              : "0,8 10,12 20,10 30,17 40,15 50,22 60,20 70,25 80,22 90,28 100,25"
          }
        />
      </svg>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-lg font-semibold">S&P 500</div>
          <div className="text-2xl font-bold">{data.sp500.price}</div>
        </div>
        <div className="flex items-center">
          <div className={`text-lg font-bold ${data.sp500.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{data.sp500.change}</div>
          {renderChart(data.sp500.chart)}
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-lg font-semibold">Nasdaq</div>
          <div className="text-2xl font-bold">{data.nasdaq.price}</div>
        </div>
        <div className="flex items-center">
          <div className={`text-lg font-bold ${data.nasdaq.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{data.nasdaq.change}</div>
          {renderChart(data.nasdaq.chart)}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg font-semibold">USD/VND</div>
          <div className="text-2xl font-bold">{data.usdVnd.price}</div>
        </div>
        <div className="flex items-center">
          <div className={`text-lg font-bold ${data.usdVnd.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{data.usdVnd.change}</div>
          {renderChart(data.usdVnd.chart)}
        </div>
      </div>
    </div>
  );
}
