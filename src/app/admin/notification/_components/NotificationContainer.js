"use client";

import { Button, Pagination } from "antd";
import { Divider } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/authSlice";
import { errorToast, successToast } from "@/utils/customToast";
import NotificationCard from "./NotificationCard";
import EmptyContainer from "@/components/EmptyContainer/EmptyContainer";
import {
  useDeleteNotificationMutation,
  useGetMyNotificationQuery,
  useMarkAsReadMutation,
} from "@/redux/api/notificationApi";
import { Spin } from "antd";

export default function NotificationContainer({
  limit,
  showPagination = true,
}) {
  const userId = useSelector(selectUser)?.userId;
  const [page, setPage] = useState(1);
  const defaultLimit = 7;
  const apiLimit = limit || defaultLimit;

  // Get notifications
  const { data: notificationsRes, isFetching } = useGetMyNotificationQuery(
    { page, limit: apiLimit },
    { skip: !userId },
  );
  const notifications = notificationsRes?.data || [];
  const meta = notificationsRes?.meta || {};

  const [markNotifications, { isLoading: isNotificationLoading }] =
    useMarkAsReadMutation();
  const [deleteNotification, { isLoading: isDeleteNotificationLoading }] =
    useDeleteNotificationMutation();

  const handleMarkNotificationsAsRead = async () => {
    try {
      await markNotifications().unwrap();
      successToast("Notifications marked as read");
    } catch (error) {
      errorToast(
        error?.message ||
          error?.data?.message ||
          "Failed to mark notifications as read",
      );
    }
  };

  const handleDeleteNotification = async () => {
    try {
      await deleteNotification().unwrap();
      successToast("All notifications deleted successfully");
    } catch (error) {
      errorToast(
        error?.message ||
          error?.data?.message ||
          "Failed to delete notifications",
      );
    }
  };

  // Debugging logs
  console.log("NotificationContainer - notificationsRes:", notificationsRes);
  console.log("NotificationContainer - meta:", meta);

  // Limit data to specified limit
  const displayData = limit ? notifications.slice(0, limit) : notifications;

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
          `${range[0]}-${range[1]} of ${total} notifications`,
        style: { marginTop: "16px", display: "flex", justifyContent: "center" },
      }
    : null;

  return (
    <div className="rounded-2xl bg-primary-black">
      <style jsx global>{`
        .notification-container .ant-pagination {
          display: flex !important;
          visibility: visible !important;
          margin-top: 16px !important;
          justify-content: center !important;
        }
      `}</style>
      <section className="flex-center-between p-6">
        <h3 className="text-2xl font-semibold text-white">Notifications</h3>
        <div className="flex items-center gap-2">
          <Button
            loading={isNotificationLoading}
            onClick={handleMarkNotificationsAsRead}
          >
            Mark as read
          </Button>
          <Button
            className="!bg-danger !text-white"
            loading={isDeleteNotificationLoading}
            onClick={handleDeleteNotification}
          >
            Delete all
          </Button>
        </div>
      </section>
      <Divider className="!my-0 !w-full bg-white" />
      <div className="mb-10 py-5">
        {isFetching ? (
          <div className="h-[800px] flex-center">
            <Spin size="large" />
          </div>
        ) : displayData.length > 0 ? (
          <section className="space-y-4 px-4">
            {displayData.map((notification) => (
              <NotificationCard
                key={notification._id}
                notification={notification}
              />
            ))}
          </section>
        ) : (
          <EmptyContainer className="!my-10 pb-20" />
        )}
      </div>
      {!isFetching && showPagination && meta.total > 0 && (
        <div className="notification-container pb-8">
          <Pagination {...paginationConfig} />
        </div>
      )}
    </div>
  );
}
