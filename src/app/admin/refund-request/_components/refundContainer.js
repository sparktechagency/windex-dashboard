"use client";

import { Input } from "antd";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import RefundTable from "./RefundTable.js";
import { useSelector } from "react-redux";

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function RefundContainer() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500); // 500ms delay

  return (
    <div>
      <section className="my-6">
        <div className="flex-center-between">
          <h4 className="text-[32px] font-semibold text-white">
            Refund Requests
          </h4>

          <div className="w-1/3">
            <Input
              placeholder="Search by title or username"
              prefix={<Search className="mr-1 text-gray-400" size={22} />}
              className="!border-secondary h-11 !w-full !rounded-lg !border !text-base"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <div className="my-5">
          <RefundTable searchTerm={debouncedSearchText} />
        </div>
      </section>
    </div>
  );
}
