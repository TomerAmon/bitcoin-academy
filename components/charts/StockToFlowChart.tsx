"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "2012", sf: 4,   actual: 13,    model: 150    },
  { year: "2013", sf: 4,   actual: 750,   model: 150    },
  { year: "2014", sf: 8,   actual: 320,   model: 1200   },
  { year: "2015", sf: 8,   actual: 430,   model: 1200   },
  { year: "2016", sf: 9,   actual: 960,   model: 1500   },
  { year: "2017", sf: 25,  actual: 14000, model: 9000   },
  { year: "2018", sf: 25,  actual: 3800,  model: 9000   },
  { year: "2019", sf: 25,  actual: 7200,  model: 9000   },
  { year: "2020", sf: 27,  actual: 29000, model: 12000  },
  { year: "2021", sf: 56,  actual: 46000, model: 55000  },
  { year: "2022", sf: 56,  actual: 16500, model: 55000  },
  { year: "2023", sf: 56,  actual: 42000, model: 55000  },
  { year: "2024", sf: 120, actual: 95000, model: 350000 },
];

const halvings = ["2012", "2016", "2020", "2024"];

function fmtUSD(v: number) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `$${Math.round(v / 1000)}K`;
  return `$${v}`;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const entry = data.find((d) => d.year === label);
  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-3 text-xs">
      <p className="text-gray-400 font-semibold mb-1">{label}</p>
      <p className="text-gray-500 mb-2">SF = {entry?.sf}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }} className="mb-1">
          {p.name}: {fmtUSD(p.value)}
        </p>
      ))}
    </div>
  );
};

export default function StockToFlowChart() {
  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-3xl p-6">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-white font-bold text-lg">מודל Stock-to-Flow של Plan B</h3>
          <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/20">
            S2F
          </span>
        </div>
        <p className="text-gray-500 text-xs">
          מחיר בפועל vs תחזית המודל. ציר Y לוגריתמי. קווים אנכיים = אירועי Halving.
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
            domain={[100, 500000]}
            tick={{ fill: "#6b7280", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmtUSD}
            width={52}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: "#9ca3af" }} />
          {halvings.map((y) => (
            <ReferenceLine
              key={y}
              x={y}
              stroke="#F7931A"
              strokeDasharray="4 4"
              strokeOpacity={0.4}
              label={{ value: "Halving", position: "top", fontSize: 9, fill: "#F7931A", opacity: 0.6 }}
            />
          ))}
          <Line
            type="monotone"
            dataKey="actual"
            name="מחיר בפועל"
            stroke="#F7931A"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "#F7931A" }}
          />
          <Line
            type="monotone"
            dataKey="model"
            name="מחיר לפי S2F"
            stroke="#8b5cf6"
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={false}
            activeDot={{ r: 4, fill: "#8b5cf6" }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-3 text-xs text-gray-500 leading-relaxed">
        <span className="text-gray-300 font-semibold">מה מראה המודל?</span> כל Halving מכפיל את יחס ה-SF (מלאי / זרימה חדשה) — מה שמנבא עלייה במחיר. המודל ניבא מחירים גבוהים מהמציאות אחרי 2020, אך הכיוון הכללי אושש. לאחר Halving 2024, ה-SF עלה ל-120 — גבוה פי 2 מזהב.
      </div>
    </div>
  );
}
