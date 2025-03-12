"use client";

import { Input, Table } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import { Search } from "lucide-react";
import userImage from "@/assets/images/user-avatar-lg.png";
import { useState } from "react";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import ProfileModal from "@/components/SharedModals/ProfileModal";
import { Tag } from "antd";
import { UserRoundX, Eye } from "lucide-react";
import {
  useBlockUserMutation,
  useGetAllUsersQuery,
  useUnblockUserMutation,
} from "@/redux/api/userApi";
import { Avatar } from "antd";
import { Image } from "antd";
import dayjs from "dayjs";
import { errorToast, successToast } from "@/utils/customToast";
import { UserCheck } from "lucide-react";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
// Dummy table Data
const data = Array.from({ length: 5 }).map((_, inx) => ({
  key: inx + 1,
  name: "Justina",
  userImg: userImage,
  email: "justina@gmail.com",
  contact: "+1234567890",
  date: "11 oct 24, 11.10PM",
}));

export default function AccountDetailsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Get all users
  const {
    data: allUsersRes,
    isLoading,
    refetch,
  } = useGetAllUsersQuery({
    limit: 99999,
    sort: "-createdAt",
    searchTerm,
  });
  const allUsers = allUsersRes?.data?.data || [];

  // Block/unblock user api handler
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  // Block user handler
  const handleBlockUser = async (id) => {
    try {
      await blockUser(id).unwrap();
      successToast("User blocked successfully!");
      refetch();
    } catch (error) {
      errorToast(error?.message || error?.data?.message);
    }
  };

  const handleUnblockUser = async (id) => {
    try {
      await unblockUser(id).unwrap();
      successToast("User unblocked successfully!");
      refetch();
    } catch (error) {
      errorToast(error?.message || error?.data?.message);
    }
  };

  // ================== Table Columns ================
  const columns = [
    {
      title: "Name",
      dataIndex: "",
      render: (value) => (
        <div className="flex-center-start gap-x-3">
          {value?.image ? (
            <Image
              src={value?.image}
              alt={"User avatar of" + value?.name}
              width={50}
              height={50}
              className="bg-white rounded-full aspect-square ring ring-primary ring-offset-transparent"
            />
          ) : (
            <Avatar size={50}>{value?.name && value?.name[0]}</Avatar>
          )}

          <p className="font-medium">{value?.name}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Joined At",
      dataIndex: "createdAt",
      render: (value) => <p>{dayjs(value).format("DD MMM, YYYY")}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag
          color={value === "active" ? "green" : "red"}
          className="capitalize"
        >
          {value}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (value) =>
        <div className="flex-center-start gap-x-3">
        <CustomTooltip title="View Details">
                    <button
                      onClick={() => setProfileModalOpen((pre) => !pre)}
                      className="!rounded-full !shadow-none"
                    >
                      <Eye size={20} />
                    </button>
                  </CustomTooltip>
    {    value?.status === "blocked" ? (
          <Tooltip title="Unblock User">
            <div className="w-max">
              <CustomConfirm
                title="Unblock User"
                description="Are you sure to unblock this user?"
                onConfirm={() => handleUnblockUser(value?._id)}
              >
                <button>
                  <UserCheck color="lightGreen" size={20} />
                </button>
              </CustomConfirm>
            </div>
          </Tooltip>
        ) : (
          <Tooltip title="Block User">
            <div className="w-max">
              <CustomConfirm
                title="Block User"
                description="Are you sure to block this user?"
                onConfirm={() => handleBlockUser(value?._id)}
              >
                <button>
                  <UserRoundX color="#F16365" size={20} />
                </button>
              </CustomConfirm>
            </div>
          </Tooltip>
        )}

        </div>
    },
    
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#322b25",
          colorInfo: "#322b25",
        },
      }}
    >
      <div className="px-1 mb-4 flex-center-between">
        <h2 className="text-[26px] font-semibold text-white">
          Account Details
        </h2>

        <Input
          placeholder="Search by name or email"
          prefix={<Search className="mr-2 text-muted" size={18} />}
          className="h-10 !w-1/2 !rounded-lg !border !text-base lg:!w-1/3 2xl:!w-1/4"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={allUsers}
        scroll={{ x: "100%" }}
        loading={isLoading}
        pagination
      ></Table>

      <ProfileModal open={profileModalOpen} setOpen={setProfileModalOpen} />
    </ConfigProvider>
  );
}
