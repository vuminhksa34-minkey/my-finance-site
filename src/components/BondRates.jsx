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
      <svg width="80" height="25" className={`inline-block ml-4 ${color}`}>
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={type === "up" ? "0,20 8,16 16,18 24,12 32,14 40,8 48,10 56,6 64,8 72,4 80,6" : "0,6 8,10 16,8 24,14 32,12 40,18 48,16 56,20 64,18 72,22 80,20"}
        />
      </svg>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-base font-semibold">Chính phủ 10 năm</div>
        <div className="flex items-center">
          <div className="text-base font-bold text-green-400">{data.govBond.rate}</div>
          {renderChart(data.govBond.chart)}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-base font-semibold">Doanh nghiệp</div>
        <div className="flex items-center">
          <div className="text-base font-bold text-green-400">{data.corpBond.rate}</div>
          {renderChart(data.corpBond.chart)}
        </div>
      </div>
    </div>
  );
}
