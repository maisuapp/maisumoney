import { useEffect, useState } from 'react';

type Holding = {
  id: number;
  name: string;
  valuation: number;
  pl: number;
  plPercent: number;
};

export default function HoldingsPage() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/holdings')
      .then((res) => res.json())
      .then((data) => {
        setHoldings(data.holdings ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Holdings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-right">Valuation</th>
              <th className="p-2 text-right">P/L</th>
              <th className="p-2 text-right">P/L %</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => (
              <tr key={h.id} className="border-t">
                <td className="p-2">{h.id}</td>
                <td className="p-2">{h.name}</td>
                <td className="p-2 text-right">{h.valuation}</td>
                <td className="p-2 text-right">{h.pl}</td>
                <td className="p-2 text-right">{h.plPercent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
