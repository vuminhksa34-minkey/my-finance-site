import { useEffect, useState } from "react";

export default function BondRates() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setData({
      govBond: {
        rate: "3.52%",
        chart: "up",
      },
      corpBond: {
        rate: "8.30%",
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
          points={type === "up" ? "0,25 10,20 20,22 30,15 40,17 50,10 60,12 70,8 80,10 90,5 100,8" : "0,8 10,12 20,10 30,17 40,15 50,22 60,20 70,25 80,22 90,28 100,25"}
        />
      </svg>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">Chính phủ 10 năm</div>
        <div className="flex items-center">
          <div className="text-lg font-bold text-green-400">{data.govBond.rate}</div>
          {renderChart(data.govBond.chart)}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Doanh nghiệp</div>
        <div className="flex items-center">
          <div className="text-lg font-bold text-green-400">{data.corpBond.rate}</div>
          {renderChart(data.corpBond.chart)}
        </div>
      </div>
    </div>
  );
}
