"use client";

import { Input } from "antd";
import { UserSearch } from "lucide-react";
import { useState } from "react";
import UsersTable from "./UsersTable";
import useDebounce from "@/hooks/useDebounce";

export default function UsersContainer() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  return (
    <div>
      <section className="my-12">
        <div className="flex-center-between">
          <h4 className="text-[32px] font-semibold text-white">Users List</h4>

          <div className="w-1/3">
            <Input
              placeholder="Search by name or email"
              prefix={<UserSearch className="mr-1 text-gray-400" size={22} />}
              className="!border-secondary h-11 !w-full !rounded-lg !border !text-base"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <div className="my-5">
          <UsersTable searchTerm={debouncedSearchText} showPagination={true} />
        </div>
      </section>
    </div>
  );
}
