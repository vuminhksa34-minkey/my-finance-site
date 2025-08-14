import { useEffect, useState } from "react";

export default function PriceTicker() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/snapshots/quotes-vnindex.json", { cache: "no-store" })
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div>Đang tải giá...</div>;
  return (
    <div>
      <strong>VN-Index: {data.price.toFixed(2)}</strong>
      <div>Thay đổi: {data.change} %</div>
      <small>Cập nhật: {new Date(data.ts).toLocaleTimeString()}</small>
    </div>
  );
}
