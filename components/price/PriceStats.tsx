"use client";

import { useEffect, useState } from "react";
import { formatUSD, formatILS, formatPercent } from "@/lib/utils/format";
import type { BitcoinPrice, MempoolData } from "@/types";

interface Props {
  initialPrice: BitcoinPrice | null;
  initialMempool: MempoolData | null;
}

export default function PriceStats({ initialPrice, initialMempool }: Props) {
  const [price, setPrice] = useState<BitcoinPrice | null>(initialPrice);
  const [mempool, setMempool] = useState<MempoolData | null>(initialMempool);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/bitcoin-price");
        if (res.ok) {
          const data = await res.json();
          setPrice(data);
          setLastUpdate(new Date());
        }
      } catch {}
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!price) {
    return (
      <div className="text-center py-20 text-gray-600">
        <p className="text-4xl mb-3">📡</p>
        <p>לא ניתן לטעון נתונים כרגע</p>
      </div>
    );
  }

  const isPositive = price.usd_24h_change >= 0;

  return (
    <div className="space-y-6">
      {/* Main price card */}
      <div className="bg-[#111118] border border-[#1e1e2e] rounded-3xl p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7931A]/5 to-transparent pointer-events-none" />
        <div className="relative">
          <p className="text-gray-500 text-sm mb-2">מחיר ביטקוין עכשיו</p>
          <p className="text-5xl md:text-6xl font-bold text-white mb-2">
            {formatUSD(price.usd)}
          </p>
          <p className="text-2xl text-gray-400 mb-4">{formatILS(price.ils)}</p>
          <span
            className={`inline-flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-full ${
              isPositive
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {isPositive ? "↑" : "↓"} {formatPercent(price.usd_24h_change)} 24 שעות
          </span>
          <p className="text-gray-700 text-xs mt-4">
            עדכון אחרון: {lastUpdate.toLocaleTimeString("he-IL")}
          </p>
        </div>
      </div>

      {/* Mempool stats */}
      {mempool && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="גובה בלוק" value={mempool.block_height.toLocaleString("he-IL")} sub="הבלוק הנוכחי" />
          <StatCard label="עמלה מהירה" value={`${mempool.fee_fast} sat/vB`} sub="~10 דקות" />
          <StatCard label="עמלה בינונית" value={`${mempool.fee_medium} sat/vB`} sub="~30 דקות" />
          <StatCard label="עמלה איטית" value={`${mempool.fee_slow} sat/vB`} sub="~60 דקות" />
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-2xl p-5 text-center">
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      <p className="text-white font-bold text-lg">{value}</p>
      <p className="text-gray-700 text-xs mt-1">{sub}</p>
    </div>
  );
}
