
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
      <div className="flex justify-between items-center">
        <div>
          <div className="text-base font-semibold">USD/VND</div>
          <div className="text-xl font-bold">{data.usdVnd.price}</div>
        </div>
        <div className="flex items-center">
          <div className={`text-base font-bold ${data.usdVnd.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{data.usdVnd.change}</div>
          {renderChart(data.usdVnd.chart)}
        </div>
      </div>
    </div>
  );
}
