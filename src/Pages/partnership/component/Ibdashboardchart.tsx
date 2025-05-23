import React from "react";
import './ibdashboardcard.css'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", commission: 100 },
  { month: "Feb", commission: 300 },
  { month: "Mar", commission: 500 },
  { month: "Apr", commission: 700 },
  { month: "May", commission: 200 },
  { month: "Jun", commission: 400 },
  { month: "Jul", commission: 600 },
];

const Ibdashboardchart = () => {
  return (
    <div className="commission-cardd">
      <h3>Monthly Commission</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(3)}K`} />
          <Tooltip formatter={(value) => `$${value}`} />
          <Line
            type="monotone"
            dataKey="commission"
            stroke="#4ade80"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Ibdashboardchart;
