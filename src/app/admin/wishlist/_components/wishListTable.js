"use client";

import { Table, Tag } from "antd";
import { Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import WishListDetailsModal from "./wishListModal";
const usersData = Array.from({ length: 5 }).map((_, inx) => ({
  key: inx + 1,
  name: "Justina Ojuylub",
  image:
    "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  description: "Capturing moments that speak..",
  userName: "Nammi Fatema",
  date: "27 Feb 2025",
  token: "25.5k",
  status: "pending",
}));

export default function wishListTable() {
  //@ts-ignore
  const [open, setOpen] = useState(false);

  // =============== Table columns ===============
  const columns = [
    // {
    //   title: "Sl. No.",
    //   dataIndex: "key",
    //   render: (value) => `#${value}`,
    // },
    {
      title: "Wish List",
      dataIndex: "description",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <Image
            src={record?.image}
            alt="Wish list"
            width={50}
            height={50}
            className="aspect-square rounded"
          />
          <div className="">
            <p>{value?.slice(0, 30)} ...</p>
            <p className="">
              <span className="h-10 w-10 border-red-400"></span>
              wishlist
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "User Name",
      dataIndex: "userName",
    },

    {
      title: "Date",
      dataIndex: "date",
    },

    {
      title: "Token",
      dataIndex: "token",
      render: (value) => {
        return (
          <Tag color="#6CC7FE">
            <div className="flex items-center">
              {" "}
              <svg
                width="21"
                height="21"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.50008 15.1667C5.83341 15.1667 3.66675 13.2533 3.66675 10.9V8.43335C3.66675 8.16002 3.89341 7.93335 4.16675 7.93335C4.44008 7.93335 4.66675 8.16002 4.66675 8.43335C4.66675 10.18 6.31341 11.5 8.50008 11.5C10.6867 11.5 12.3334 10.18 12.3334 8.43335C12.3334 8.16002 12.5601 7.93335 12.8334 7.93335C13.1067 7.93335 13.3334 8.16002 13.3334 8.43335V10.9C13.3334 13.2533 11.1667 15.1667 8.50008 15.1667ZM4.66675 10.9733C4.71341 12.74 6.41341 14.1667 8.50008 14.1667C10.5867 14.1667 12.2867 12.74 12.3334 10.9733C11.4667 11.9133 10.0934 12.5 8.50008 12.5C6.90675 12.5 5.54008 11.9133 4.66675 10.9733Z"
                  fill="#fff"
                />
                <path
                  d="M8.50008 9.16668C6.66008 9.16668 5.00674 8.34001 4.20007 7.00668C3.85341 6.44001 3.66675 5.78001 3.66675 5.10001C3.66675 3.95334 4.18008 2.87334 5.10675 2.06001C6.01342 1.26668 7.22008 0.833344 8.50008 0.833344C9.78008 0.833344 10.9801 1.26668 11.8934 2.05334C12.8201 2.87334 13.3334 3.95334 13.3334 5.10001C13.3334 5.78001 13.1468 6.43334 12.8001 7.00668C11.9934 8.34001 10.3401 9.16668 8.50008 9.16668ZM8.50008 1.83334C7.46008 1.83334 6.48676 2.18001 5.76009 2.82001C5.05342 3.43334 4.66675 4.24668 4.66675 5.10001C4.66675 5.60001 4.80007 6.06668 5.05341 6.48668C5.68674 7.52668 7.00675 8.16668 8.50008 8.16668C9.99341 8.16668 11.3134 7.52001 11.9468 6.48668C12.2068 6.06668 12.3334 5.60001 12.3334 5.10001C12.3334 4.24668 11.9468 3.43334 11.2334 2.80668C10.5068 2.18001 9.54008 1.83334 8.50008 1.83334Z"
                  fill="#fff"
                />
                <path
                  d="M8.50008 12.5C5.74675 12.5 3.66675 10.7533 3.66675 8.43334V5.10001C3.66675 2.74668 5.83341 0.833344 8.50008 0.833344C9.78008 0.833344 10.9801 1.26668 11.8934 2.05334C12.8201 2.87334 13.3334 3.95334 13.3334 5.10001V8.43334C13.3334 10.7533 11.2534 12.5 8.50008 12.5ZM8.50008 1.83334C6.38675 1.83334 4.66675 3.30001 4.66675 5.10001V8.43334C4.66675 10.18 6.31341 11.5 8.50008 11.5C10.6867 11.5 12.3334 10.18 12.3334 8.43334V5.10001C12.3334 4.24668 11.9468 3.43334 11.2334 2.80668C10.5068 2.18001 9.54008 1.83334 8.50008 1.83334Z"
                  fill="#fff"
                />
              </svg>
              {value}
            </div>
          </Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag
          color={value === "completed" ? "green" : "red"}
          className="capitalize"
        >
          {value}
        </Tag>
      ),

      filters: [
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Completed",
          value: "completed",
        },
      ],
      onFilter: (value, record) => record?.status?.startsWith(value),
      filterSearch: true,
      // width: '40%',
    },

    {
      title: "Action",
      dataIndex: "",
      render: (value, record) => (
        <div className="flex-center-start gap-x-3">
          <CustomTooltip title="View Details">
            <button
              onClick={() => setOpen((pre) => !pre)}
              className="!rounded-full !shadow-none"
            >
              <Eye size={20} />
            </button>
          </CustomTooltip>

          <CustomTooltip title="Remove Wishlist">
            <button className="!rounded-full !shadow-none">
              <Trash2 className="text-red-500" size={20} />
            </button>
          </CustomTooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={usersData}
        scroll={{ x: "100%" }}
      ></Table>

      <WishListDetailsModal open={open} setOpen={setOpen} />
    </div>
  );
}
