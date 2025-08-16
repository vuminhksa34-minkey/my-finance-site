import { useEffect, useState } from "react";

export default function PriceTicker() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/market-data");
        const backendData = await response.json();

        const formatChange = (change) => {
          if (change === "N/A") return "N/A";
          const sign = change > 0 ? "+" : "";
          return `${sign}${change.toFixed(2)}%`;
        };

        setData({
          price: backendData.vnindex.price ? backendData.vnindex.price.toFixed(2) : "N/A",
          change: formatChange(backendData.vnindex.change),
          chart: backendData.vnindex.change > 0 ? "up" : "down",
        });
      } catch (error) {
        console.error("Error fetching VN-Index data from backend:", error);
        // Fallback to static data or show error message
        setData({
          price: "1245.56",
          change: "-0.23%",
          chart: "down",
        });
      }
    };

    fetchData();
  }, []);

  if (!data) return <div>Đang tải giá...</div>;

  const renderChart = () => {
    const color = data.chart === "up" ? "text-green-400" : "text-red-400";
    return (
      <svg width="100" height="40" className={`inline-block ml-4 ${color}`}>
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={data.chart === "up" ? "0,35 10,30 20,32 30,25 40,27 50,20 60,22 70,15 80,17 90,10 100,12" : "0,12 10,17 20,15 30,22 40,20 50,27 60,25 70,32 80,30 90,35 100,32"}
        />
      </svg>
    );
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="text-xl font-bold">VN-Index</div>
        <div className="text-3xl font-bold">{data.price}</div>
        <div className={`${data.chart === "up" ? "text-green-400" : "text-red-400"} text-sm`}>
          Cập nhật: {data.change}
        </div>
      </div>
      <div>{renderChart()}</div>
    </div>
  );
}
