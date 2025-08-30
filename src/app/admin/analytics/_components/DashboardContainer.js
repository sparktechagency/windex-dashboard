"use client";

import CustomBarChart from "@/components/CustomBarChart";
import CustomCountUp from "@/components/CustomCountUp/CustomCountUp";
import CustomAreaChart from "@/components/CustomAreaChart";
import PageLoader from "@/components/shared/PageLoader/PageLoader";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetMetaDataQuery } from "@/redux/api/dashboardApi";
import { Users } from "lucide-react";
import { ClipboardList } from "lucide-react";
import { DollarSign } from "lucide-react";
import UsersTable from "../../users/_components/UsersTable";
import UsersOverview from "./UserOverAnalytics";
import UserOverAnalytics from "./UserOverAnalytics";

export default function AnalyticsContainer() {
  const [userYear, setUserYear] = useState(dayjs().year());
  const [incomeYear, setIncomeYear] = useState(dayjs().year());

  const query = {
    user_year: userYear,
    earning_year: incomeYear,
  };

  const { data: dashboardDataRes, isLoading } = useGetMetaDataQuery(query);
  const dashboardData = dashboardDataRes?.data || {};

  if (isLoading) {
    return <PageLoader />;
  }

  const userStats = [
    {
      key: "users",
      title: "Total Users",
      icon: <Users size={35} />,
      count: Number(dashboardData?.totalUserCount || 0),
    },
    {
      key: "wishlist",
      title: "Total Wishlist",
      icon: <ClipboardList size={35} />,
      count: Number(dashboardData?.totalWishlist || 0),
    },
    {
      key: "earnings",
      title: "Total Earnings",
      icon: <DollarSign size={35} />,
      count: Number(dashboardData?.totalRevenue || 0),
    },
  ];

  const sampleData = [
  { year: "2018", active: 5, inactive: 2 },
  { year: "2019", active: 15, inactive: 5 },
  { year: "2020", active: 20, inactive: 5 },
  { year: "2021", active: 10, inactive: 3 },
  { year: "2022", active: 20, inactive: 5 },
  { year: "2023", active: 15, inactive: 5 },
  { year: "2024", active: 25, inactive: 5 },
  { year: "2025", active: 30, inactive: 5 },
];

  return (
    <div className="space-y-10">
      <section className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-3">
        {userStats?.map((stat) => (
          <div
            key={stat.key}
            className="flex-center-start gap-x-4 rounded-xl bg-primary-black px-6 py-6 text-white"
          >
            <div className="flex-center aspect-square rounded-full bg-primary-black p-4">
              {stat.icon}
            </div>
            <div>
              <p className="text-lg font-medium">{stat.title}</p>
              <h5 className="mt-1 text-4xl font-medium">
                {stat.key !== "earnings" ? (
                  <CustomCountUp end={stat.count} />
                ) : (
                  <span>
                    <CustomCountUp end={stat.count} />
                    <span className="text-sm"> USD</span>
                  </span>
                )}
              </h5>
            </div>
          </div>
        ))}
      </section>

      <section className="flex-center-between flex-col gap-10 lg:flex-row">
        <UserOverAnalytics chartName="Users" data={dashboardData?.userOverview} />
        <CustomAreaChart
          chartName="Earnings"
          data={dashboardData?.earningOverview}
          setIncomeYear={setIncomeYear}
        />
      </section>
    </div>
  );
}
