"use client";

import { Table, Tag, message, Input } from "antd";
import { Eye, Trash2, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import dayjs from "dayjs";
import {
  useGetWishlistsQuery,
  useDeleteWishlistMutation,
  useChangeWishlistStatusMutation,
} from "@/redux/api/wishlistApi";
import WishListDetailsModal from "./wishListModal";
import { useSelector } from "react-redux";

const WishListTable = ({ searchTerm = "", limit, showPagination = true }) => {
  const [open, setOpen] = useState(false);
  const [selectedWishlist, setSelectedWishlist] = useState(null);
  const [page, setPage] = useState(1);
  const [denyReason, setDenyReason] = useState("");
  const defaultLimit = 10;
  const apiLimit = limit || defaultLimit;

  // Fetch wishlists with pagination and search
  const {
    data: wishlistsResponse,
    isFetching,
    isError,
    error,
  } = useGetWishlistsQuery({
    page,
    limit: apiLimit,
    searchTerm,
  });

  const [deleteWishlist] = useDeleteWishlistMutation();
  const [changeWishlistStatus] = useChangeWishlistStatusMutation();

  const wishlistsData = wishlistsResponse?.data || [];
  const meta = wishlistsResponse?.meta || {};

  // get user role
  const user = useSelector((state) => state.auth.user);
  const role = user?.role;

  // Debugging logs
  console.log("WishListTable - wishlistsResponse:", wishlistsResponse);
  console.log(
    "WishListTable - page:",
    page,
    "limit:",
    apiLimit,
    "searchTerm:",
    searchTerm,
  );
  console.log("WishListTable - meta:", meta);
  console.log("WishListTable - showPagination:", showPagination);

  // Map API data to table format
  const tableData = wishlistsData.map((wishlist, index) => ({
    key: (page - 1) * apiLimit + index + 1,
    title: wishlist.title,
    image:
      wishlist?.content ||
      wishlist?.author?.photoUrl ||
      "https://via.placeholder.com/50",
    description: wishlist.description,
    userName: wishlist.author.name,
    email: wishlist.author.email || "N/A",
    address: [
      wishlist.author.street,
      wishlist.author.city,
      wishlist.author.state,
      wishlist.author.country,
      wishlist.author.zipCode,
    ]
      .filter(Boolean)
      .join(", "),
    date: dayjs(wishlist.createdAt).format("DD MMM YYYY"),
    token: wishlist.token,
    status: wishlist.status,
    trnId: wishlist.contentMeta?._id || "N/A",
    _id: wishlist._id,
  }));

  // Limit data to specified limit
  const displayData = limit ? tableData.slice(0, limit) : tableData;

  // Error handling
  if (isError) {
    message.error(error?.data?.message || "Failed to fetch wishlists");
  }

  const paginationConfig = showPagination
    ? {
        current: page,
        pageSize: apiLimit,
        total: meta.total || 0,
        onChange: (newPage) => {
          console.log("Pagination changed to page:", newPage);
          setPage(newPage);
        },
        showSizeChanger: false,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} wishlists`,
        style: { marginTop: "16px", display: "flex" },
      }
    : false;

  const columns = [
    {
      title: "Wish List",
      dataIndex: "title",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <Image
            src={record.image}
            alt="Wish list"
            width={50}
            height={50}
            className="aspect-square rounded"
          />
          <div>
            <p>{value}</p>
            <p className="text-gray-500">
              {record.description.slice(0, 30)}...
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
      title: "Address",
      dataIndex: "address",
      render: (value) => value || "N/A",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Token",
      dataIndex: "token",
      render: (value) => (
        <Tag color="#6CC7FE">
          <div className="flex items-center">
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
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag
          color={
            value === "approved"
              ? "green"
              : value === "denied"
                ? "red"
                : "orange"
          }
          className="capitalize"
        >
          {value}
        </Tag>
      ),
      filters: [
        { text: "Approved", value: "approved" },
        { text: "Pending", value: "pending" },
        { text: "Denied", value: "denied" },
      ],
      onFilter: (value, record) => record?.status?.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Action",
      dataIndex: "",
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <CustomTooltip title="View Details">
            <button
              onClick={() => {
                setSelectedWishlist(record);
                setOpen(true);
              }}
              className="!rounded-full !shadow-none"
            >
              <Eye size={20} />
            </button>
          </CustomTooltip>

          {role == "admin" && (
            <div>
              {" "}
              {record.status !== "approved" && (
                <CustomTooltip title="Approve Wishlist">
                  <button
                    className="!rounded-full !shadow-none"
                    onClick={async () => {
                      try {
                        await changeWishlistStatus({
                          id: record._id,
                          data: { status: "approved" },
                        }).unwrap();
                        message.success("Wishlist approved successfully");
                      } catch (err) {
                        message.error("Failed to approve wishlist");
                      }
                    }}
                  >
                    <CheckCircle className="text-green-500" size={20} />
                  </button>
                </CustomTooltip>
              )}
              {record.status !== "denied" && (
                <CustomConfirm
                  description={
                    <div>
                      <p>Are you sure you want to deny this wishlist?</p>
                      <Input
                        placeholder="Enter reason for denial"
                        value={denyReason}
                        onChange={(e) => setDenyReason(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  }
                  onConfirm={async () => {
                    if (!denyReason) {
                      message.error("Please provide a reason for denial");
                      return;
                    }
                    try {
                      await changeWishlistStatus({
                        id: record._id,
                        data: { status: "denied", reason: denyReason },
                      }).unwrap();
                      message.success("Wishlist denied successfully");
                      setDenyReason(""); // Reset reason
                    } catch (err) {
                      message.error("Failed to deny wishlist");
                    }
                  }}
                  onCancel={() => setDenyReason("")} // Reset reason on cancel
                >
                  <button className="!rounded-full !shadow-none">
                    <CustomTooltip title="Deny Wishlist">
                      <XCircle className="text-red-500" size={20} />
                    </CustomTooltip>
                  </button>
                </CustomConfirm>
              )}
              <CustomTooltip title="Remove Wishlist">
                <button
                  className="!rounded-full !shadow-none"
                  onClick={async () => {
                    try {
                      await deleteWishlist(record._id).unwrap();
                      message.success("Wishlist deleted successfully");
                    } catch (err) {
                      message.error("Failed to delete wishlist");
                    }
                  }}
                >
                  <Trash2 className="text-red-500" size={20} />
                </button>
              </CustomTooltip>{" "}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="mb-16">
      <style jsx global>
        {`
          .wishlist-table .ant-table-pagination {
            display: flex !important;
            visibility: visible !important;
            margin-top: 16px !important;
          }
        `}
      </style>
      {displayData.length === 0 && !isFetching ? (
        <div>No wishlists available</div>
      ) : (
        <Table
          style={{ overflowX: "auto" }}
          className="wishlist-table"
          columns={columns}
          dataSource={displayData}
          loading={isFetching}
          pagination={paginationConfig}
          scroll={{ x: "100%" }}
        />
      )}
      <WishListDetailsModal
        open={open}
        setOpen={setOpen}
        wishlist={selectedWishlist}
      />
    </div>
  );
};

export default WishListTable;
