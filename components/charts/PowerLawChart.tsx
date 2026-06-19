"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Power law formula: log10(price) = 5.82 × log10(days) − 17.35
// Days since genesis block (Jan 3, 2009)
// Channel: ×10 above trend (bubble zone), ÷5 below trend (support zone)
function trend(days: number) {
  return Math.round(Math.pow(10, 5.82 * Math.log10(days) - 17.35));
}

const data = [
  { year: "2011", actual: 5,      trendLine: trend(730),  floor: Math.round(trend(730)/5),  ceiling: trend(730)*10  },
  { year: "2012", actual: 13,     trendLine: trend(1278), floor: Math.round(trend(1278)/5), ceiling: trend(1278)*10 },
  { year: "2013", actual: 750,    trendLine: trend(1643), floor: Math.round(trend(1643)/5), ceiling: trend(1643)*10 },
  { year: "2014", actual: 320,    trendLine: trend(2008), floor: Math.round(trend(2008)/5), ceiling: trend(2008)*10 },
  { year: "2015", actual: 430,    trendLine: trend(2373), floor: Math.round(trend(2373)/5), ceiling: trend(2373)*10 },
  { year: "2016", actual: 960,    trendLine: trend(2738), floor: Math.round(trend(2738)/5), ceiling: trend(2738)*10 },
  { year: "2017", actual: 14000,  trendLine: trend(3103), floor: Math.round(trend(3103)/5), ceiling: trend(3103)*10 },
  { year: "2018", actual: 3800,   trendLine: trend(3468), floor: Math.round(trend(3468)/5), ceiling: trend(3468)*10 },
  { year: "2019", actual: 7200,   trendLine: trend(3833), floor: Math.round(trend(3833)/5), ceiling: trend(3833)*10 },
  { year: "2020", actual: 29000,  trendLine: trend(4198), floor: Math.round(trend(4198)/5), ceiling: trend(4198)*10 },
  { year: "2021", actual: 46000,  trendLine: trend(4563), floor: Math.round(trend(4563)/5), ceiling: trend(4563)*10 },
  { year: "2022", actual: 16500,  trendLine: trend(4928), floor: Math.round(trend(4928)/5), ceiling: trend(4928)*10 },
  { year: "2023", actual: 42000,  trendLine: trend(5293), floor: Math.round(trend(5293)/5), ceiling: trend(5293)*10 },
  { year: "2024", actual: 95000,  trendLine: trend(5658), floor: Math.round(trend(5658)/5), ceiling: trend(5658)*10 },
];

function fmtUSD(v: number) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `$${Math.round(v / 1000)}K`;
  return `$${v}`;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-3 text-xs">
      <p className="text-gray-400 font-semibold mb-2">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }} className="mb-1">
          {p.name}: {fmtUSD(p.value)}
        </p>
      ))}
    </div>
  );
};

export default function PowerLawChart() {
  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-3xl p-6">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-white font-bold text-lg">Bitcoin Power Law — חוק החזקה</h3>
          <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20">
            Power Law
          </span>
        </div>
        <p className="text-gray-500 text-xs">
          מחיר בפועל (כתום) vs מגמת חוק החזקה (אפור). ציר Y לוגריתמי. נוסחה: log₁₀(price) = 5.82 × log₁₀(days) − 17.35
        </p>
      </div>
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#1e1e2e" strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={{ stroke: "#1e1e2e" }}
            tickLine={false}
          />
          <YAxis
            scale="log"
            domain={[1, 1000000]}
            tick={{ fill: "#6b7280", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmtUSD}
            width={52}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: "#9ca3af" }} />
          <Line
            type="monotone"
            dataKey="ceiling"
            name="אזור בועה (×10 מהמגמה)"
            stroke="#ef4444"
            strokeWidth={1}
            strokeDasharray="4 4"
            dot={false}
            opacity={0.4}
          />
          <Line
            type="monotone"
            dataKey="trendLine"
            name="מגמת Power Law"
            stroke="#6b7280"
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="floor"
            name="רצפת תמיכה (÷5 מהמגמה)"
            stroke="#22c55e"
            strokeWidth={1}
            strokeDasharray="4 4"
            dot={false}
            opacity={0.5}
          />
          <Line
            type="monotone"
            dataKey="actual"
            name="מחיר BTC בפועל"
            stroke="#F7931A"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "#F7931A" }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-center">
        <div className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl p-3">
          <p className="text-red-400 font-semibold mb-1">🔴 אזור בועה</p>
          <p className="text-gray-600">מחיר גבוה מפי 10 מהמגמה — תיקון צפוי</p>
        </div>
        <div className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl p-3">
          <p className="text-gray-300 font-semibold mb-1">⚪ מגמה</p>
          <p className="text-gray-600">חוק החזקה — לא נשבר מאז 2011</p>
        </div>
        <div className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl p-3">
          <p className="text-green-400 font-semibold mb-1">🟢 רצפה</p>
          <p className="text-gray-600">תמיכה היסטורית — הזדמנות קנייה</p>
        </div>
      </div>
    </div>
  );
}
