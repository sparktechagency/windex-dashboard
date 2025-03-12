"use client";

import { Table, Tag, Input } from "antd";
import { Search, CircleAlert } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip"; 
import ReportModal from "./reportModal";
const reportData = Array.from({ length: 5 }).map((_, inx) => ({
  key: inx + 1,
user:{  name: "Justina Ojuylub",
    email:"user@gmial.com",
  image:
    "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
},
  reason: "Harassment", 
  date: "27 Feb 2025", 
}));
 

export default function ReportReviewTable() {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // =============== Table columns ===============
  const columns = [
    ,
    {
      title: "Profile",
      dataIndex: "user",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <Image
            src={value?.image}
            alt="user profile"
            width={50}
            height={50}
            className="rounded-full aspect-square"
          />
          <div className="">
            <p>{value?.name}</p>
            <p className=""> 
              {record?.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Reason",
      dataIndex: "reason",
    },
    {
      title: "Date",
      dataIndex: "date",
    },

    {
      title: "Action",
      dataIndex: "",
      render: (value, record) => (
        <div className="flex-center-start gap-x-3">
          <CustomTooltip title="View Details">
            <button
              onClick={() => {
                setOpen((pre) => !pre);
                setModalData(record);
              }}
              className="!rounded-full !shadow-none"
            >
              <CircleAlert size={20} />
            </button>
          </CustomTooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <section className="my-6">
        <div className="flex-center-between">
          <h4 className="text-[32px] font-semibold text-white">Report Profile Review</h4>

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
          <Table
            style={{ overflowX: "auto" }}
            columns={columns}
            dataSource={reportData}
            scroll={{ x: "100%" }}
          ></Table>

          <ReportModal
            open={open}
            setOpen={setOpen}
            modalData={modalData}
            setModalData={setModalData}
          />
        </div>
      </section>
    </div>
  );
}
