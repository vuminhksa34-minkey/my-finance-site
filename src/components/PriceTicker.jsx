import { useEffect, useState } from "react";

export default function PriceTicker() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/snapshots/quotes-vnindex.json", { cache: "no-store" })
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div>Đang tải giá...</div>;

  const renderChart = () => {
    const color = data.change > 0 ? "text-red-400" : "text-green-400";
    return (
      <svg width="100" height="40" className={`inline-block ml-4 ${color}`}>
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={data.change > 0 ? "0,35 10,30 20,32 30,25 40,27 50,20 60,22 70,15 80,17 90,10 100,12" : "0,12 10,17 20,15 30,22 40,20 50,27 60,25 70,32 80,30 90,35 100,32"}
        />
      </svg>
    );
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="text-xl font-bold">VN-Index</div>
        <div className="text-3xl font-bold">{data.price.toFixed(2)}</div>
        <div className={`${data.change > 0 ? "text-red-400" : "text-green-400"} text-sm`}>
          Cập nhật: {data.change.toFixed(2)}%
        </div>
      </div>
      <div>{renderChart()}</div>
    </div>
  );
}
