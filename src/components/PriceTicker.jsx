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
      <svg width="150" height="60" className={`inline-block ml-4 ${color}`}>
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={data.change > 0 ? "0,50 15,45 30,47 45,40 60,42 75,35 90,37 105,30 120,32 135,25 150,28" : "0,28 15,32 30,30 45,37 60,35 75,42 90,40 105,45 120,47 135,50 150,50"}
        />
      </svg>
    );
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="text-2xl font-bold">VN-Index</div>
        <div className="text-4xl font-bold">{data.price.toFixed(2)}</div>
        <div className={`${data.change > 0 ? "text-red-400" : "text-green-400"}`}>
          Cập nhật: {data.change.toFixed(2)}%
        </div>
      </div>
      <div>{renderChart()}</div>
    </div>
  );
}
