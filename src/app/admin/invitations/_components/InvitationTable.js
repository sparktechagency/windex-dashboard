"use client";

import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import { Table, Tooltip, message } from "antd";
import { Eye, UserRoundX, UserRoundCheck } from "lucide-react";
import { useState } from "react";
import ProfileModal from "@/components/SharedModals/ProfileModal";
import {
  useChangeUserStatusMutation,
  useGetSubAdminsQuery,
} from "@/redux/api/userApi";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const InvitationTable = ({ limit = null, showPagination = true }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const defaultLimit = 10;
  const apiLimit = limit || defaultLimit;

  const user = useSelector((state) => state.auth.user);
  const role = user?.permission;

  // Fetch users data with pagination
  const {
    data: usersResponse,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetSubAdminsQuery({
    page,
    limit: apiLimit,
  });

  const [changeUserStatus] = useChangeUserStatusMutation();

  const usersData = usersResponse?.data || [];
  const meta = usersResponse?.meta || {};

  // Map API data to table format
  const tableData = usersData.map((user, index) => ({
    key: (page - 1) * apiLimit + index + 1,
    name: user.name,
    email: user.email,
    date: dayjs(user.createdAt).format("DD MMM YY, hh:mm A"),
    _id: user._id,
    status: user.status,
    address:
      `${user.street || "N/A"}, ${user.city || "N/A"}, ${user.state || "N/A"}, ${user.country || "N/A"}`.trim(),
    contractNumber: user.contractNumber || "N/A",
    permission: user.permission || "N/A",
  }));

  // Limit data to specified limit (e.g., 5 for dashboard)
  const displayData = limit ? tableData.slice(0, limit) : tableData;

  // Error handling
  if (isError) {
    message.error(error?.data?.message || "Failed to fetch users");
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
          `${range[0]}-${range[1]} of ${total} users`,
      }
    : false;

  const columns = [
    {
      title: "Sl. No.",
      dataIndex: "key",
      render: (value) => `#${value}`,
    },
    {
      title: "Full Name",
      dataIndex: "name",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <p>{value}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Permission",
      dataIndex: "permission",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      render: (_, record) => (
        <div
          className={
            role === "viewer"
              ? "mt-6 flex hidden justify-between"
              : "mt-6 block flex gap-5"
          }
        >
          <Tooltip title="Show Details">
            <button
              onClick={() => {
                setSelectedUser(record);
                setShowProfileModal(true);
              }}
            >
              <Eye color="white" size={23} />
            </button>
          </Tooltip>
          <Tooltip
            title={record.status === "blocked" ? "Unblock User" : "Block User"}
          >
            <CustomConfirm
              title={"Change User Status"}
              description={`Are you sure you want to ${
                record.status === "blocked" ? "unblock" : "block"
              } this user?`}
              onConfirm={async () => {
                try {
                  await changeUserStatus({
                    userId: record._id,
                    status: record.status === "blocked" ? "active" : "blocked",
                  }).unwrap();
                  message.success(
                    `User ${record.status === "blocked" ? "unblocked" : "blocked"} successfully`,
                  );
                  refetch();
                } catch (err) {
                  console.log("err", err);
                  message.error("Failed to change user status");
                }
              }}
            >
              <button>
                {record.status === "blocked" ? (
                  <UserRoundCheck color="green" size={22} />
                ) : (
                  <UserRoundX color="var(--danger)" size={22} />
                )}
              </button>
            </CustomConfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="mb-16">
      <Table
        style={{ overflowX: "auto" }}
        className="users-table"
        columns={columns}
        dataSource={displayData}
        loading={isFetching}
        pagination={paginationConfig}
        scroll={{ x: "100%" }}
      />
      <ProfileModal
        open={showProfileModal}
        setOpen={setShowProfileModal}
        user={selectedUser}
      />
    </div>
  );
};

export default InvitationTable;
