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

const data = [
  { year: "2012", btc: 100,     gold: 100, usd: 100 },
  { year: "2013", btc: 5769,    gold: 72,  usd: 98  },
  { year: "2014", btc: 2462,    gold: 71,  usd: 97  },
  { year: "2015", btc: 3308,    gold: 63,  usd: 97  },
  { year: "2016", btc: 7385,    gold: 69,  usd: 95  },
  { year: "2017", btc: 107692,  gold: 78,  usd: 93  },
  { year: "2018", btc: 29231,   gold: 76,  usd: 90  },
  { year: "2019", btc: 55385,   gold: 91,  usd: 88  },
  { year: "2020", btc: 223077,  gold: 113, usd: 87  },
  { year: "2021", btc: 353846,  gold: 109, usd: 82  },
  { year: "2022", btc: 126923,  gold: 109, usd: 73  },
  { year: "2023", btc: 323077,  gold: 123, usd: 71  },
  { year: "2024", btc: 730769,  gold: 158, usd: 69  },
];

function fmt(v: number) {
  if (v >= 1000) return `${Math.round(v / 1000)}K`;
  return v.toString();
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-3 text-xs">
      <p className="text-gray-400 mb-2 font-semibold">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }} className="mb-1">
          {p.name}: {p.value.toLocaleString("he-IL")}
        </p>
      ))}
    </div>
  );
};

export default function AssetComparisonChart() {
  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-3xl p-6">
      <div className="mb-4">
        <h3 className="text-white font-bold text-lg mb-1">₿ ביטקוין vs זהב vs דולר — 2012 עד 2024</h3>
        <p className="text-gray-500 text-xs">ערך מנורמל: 100 = שנת 2012. ציר Y בסקאלה לוגריתמית. נתונים משוערים.</p>
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
            domain={[50, 800000]}
            tick={{ fill: "#6b7280", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmt}
            width={44}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, color: "#9ca3af" }}
          />
          <Line
            type="monotone"
            dataKey="btc"
            name="ביטקוין ₿"
            stroke="#F7931A"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "#F7931A" }}
          />
          <Line
            type="monotone"
            dataKey="gold"
            name="זהב 🏅"
            stroke="#FFD700"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#FFD700" }}
          />
          <Line
            type="monotone"
            dataKey="usd"
            name="דולר (כוח קנייה) 💵"
            stroke="#ef4444"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            activeDot={{ r: 4, fill: "#ef4444" }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-gray-700 text-[10px] mt-3 text-center">
        * 100 = שנת 2012 | ציר Y לוגריתמי — כל תוסף מייצג פי 10 | לצורך המחשה בלבד
      </p>
    </div>
  );
}
