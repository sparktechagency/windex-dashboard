"use client";

import { Input } from "antd";
import { Search } from "lucide-react";
import { useState } from "react";
import WishListTable from "./wishListTable"; 

const totalUsers = {
  key: "users",
  title: "Total Users",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="61"
      fill="none"
      viewBox="0 0 60 61"
    >
      <path
        stroke="#138487"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M42.5 50.5H55v-5a7.5 7.5 0 0 0-13.39-4.643m.89 9.643h-25m25 0v-5c0-1.64-.316-3.207-.89-4.643M17.5 50.5H5v-5a7.5 7.5 0 0 1 13.39-4.643M17.5 50.5v-5c0-1.64.316-3.207.89-4.643m0 0C20.235 36.253 24.738 33 30 33s9.766 3.253 11.61 7.857M37.5 18a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0m15 7.5a5 5 0 1 1-10 0 5 5 0 0 1 10 0m-35 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
      ></path>
    </svg>
  ),
  count: 518,
};

export default function WishListContainer() {
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <section className="my-6">
        <div className="flex-center-between">
          <h4 className="text-[32px] font-semibold text-white">Wish List</h4>

          <div className="w-1/3">
            <Input 
              placeholder="Search..."
              prefix={<Search className="mr-1 text-gray-400" size={22} />}
              className="!border-secondary h-11 !w-full !rounded-lg !border !text-base"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <div className="my-5">
          <WishListTable />
        </div>
      </section>
    </div>
  );
}
