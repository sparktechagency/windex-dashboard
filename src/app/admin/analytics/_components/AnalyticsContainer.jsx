"use client";

import PageLoader from "@/components/shared/PageLoader/PageLoader";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetAnalyticsQuery } from "@/redux/api/dashboardApi";
import UserOverAnalytics from "./UserOverAnalytics";
import EarningAnalytics from "./EarningAnalytics";

export default function AnalyticsContainer() {
  const [userYear, setUserYear] = useState(dayjs().year());
  const [incomeYear, setIncomeYear] = useState(dayjs().year());

  const query = {
    user_year: userYear,
    earning_year: incomeYear,
  };

  const { data: dashboardDataRes, isLoading } = useGetAnalyticsQuery(query);
  const dashboardData = dashboardDataRes?.data || {};

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-10">
      <section className="flex-center-between flex-col gap-10 lg:flex-row">
        <UserOverAnalytics
          chartName="Users"
          data={dashboardData?.userOverview}
          setJoinYear={setUserYear}
        />
        <EarningAnalytics
          chartName="Earnings"
          data={dashboardData?.earningOverview}
          setYear={setIncomeYear}
        />
      </section>
    </div>
  );
}
