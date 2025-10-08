"use client";

import CustomBarChart from "@/components/CustomBarChart";
import CustomCountUp from "@/components/CustomCountUp/CustomCountUp";
import CustomAreaChart from "@/components/CustomAreaChart";
import PageLoader from "@/components/shared/PageLoader/PageLoader";
import { useGetMetaDataQuery } from "@/redux/api/dashboardApi";
import { Users } from "lucide-react";
import { ClipboardList } from "lucide-react";
import { DollarSign } from "lucide-react";
import UsersTable from "../../users/_components/UsersTable";

export default function DashboardContainer() {
  const { data: dashboardDataRes, isLoading } = useGetMetaDataQuery();

  const dashboardData = dashboardDataRes?.data || {};

  if (isLoading) {
    return <PageLoader />;
  }
  console.log("dashboardData", dashboardData?.totalRevenue);
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
        <CustomBarChart chartName="Users" data={dashboardData?.userOverview} />
        <CustomAreaChart
          chartName="Earnings"
          data={dashboardData?.earningOverview}
        />
      </section>

      <section className="pb-20">
        <UsersTable showPagination={false} limit={5} />
      </section>
    </div>
  );
}
