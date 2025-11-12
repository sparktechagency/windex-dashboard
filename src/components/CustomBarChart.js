"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomBarChart = ({ chartName, data = [] }) => {
  // Ensure valid array structure
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="w-full rounded-xl bg-primary-black p-6 md:w-1/2">
      <div className="mb-10 flex items-center justify-between gap-2 lg:flex-wrap xl:flex-nowrap">
        <h1 className="text-xl font-medium text-white">{chartName} Overview</h1>
      </div>

      {safeData.length === 0 ? (
        <p className="py-10 text-center text-gray-400">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={safeData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            barSize={20}
          >
            <XAxis
              dataKey="year"
              scale="point"
              padding={{ left: 10, right: 10 }}
              tickMargin={10}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "lightGray" }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={20}
              tick={{ fill: "lightGray" }}
            />

            <Tooltip
              formatter={(value) => [`Monthly Users Joined: ${value}`]}
              contentStyle={{
                color: "var(--primary-black)",
                fontWeight: "500",
                borderRadius: "5px",
                border: "0",
              }}
              itemStyle={{
                color: "var(--primary)",
                fontWeight: "500",
              }}
            />

            <CartesianGrid
              opacity={0.2}
              horizontal
              vertical={false}
              stroke="var(--primary)"
              strokeDasharray="3 3"
            />

            <Bar
              barSize={18}
              radius={12}
              dataKey="count"
              fill="var(--primary-white)"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CustomBarChart;
