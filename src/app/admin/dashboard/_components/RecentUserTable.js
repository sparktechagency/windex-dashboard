"use client";

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
import { UserRoundX } from "lucide-react";
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

const RecentUserTable = ({ data: allUsers, isLoading, refetch }) => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);

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
              className="ring-primary aspect-square rounded-full bg-white ring ring-offset-transparent"
            />
          ) : (
            <Avatar className="!bg-white !text-black" size={50}>
              {value?.name && value?.name[0]}
            </Avatar>
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
        value?.status === "blocked" ? (
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
        ),
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
      <h4 className="text-primary-white mb-6 text-2xl font-semibold">
        Recently Joined Users
      </h4>

      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={allUsers?.slice(0, 5)}
        scroll={{ x: "100%" }}
        loading={isLoading}
        pagination
      ></Table>

      <ProfileModal open={profileModalOpen} setOpen={setProfileModalOpen} />
    </ConfigProvider>
  );
};

export default RecentUserTable;
