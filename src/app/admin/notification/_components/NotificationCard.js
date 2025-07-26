"use client";

import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
import { Bell, Trash2 } from "lucide-react";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import { useDeleteSingleNotificationMutation } from "@/redux/api/notificationApi";
import { errorToast, successToast } from "@/utils/customToast";

export default function NotificationCard({ notification }) {
  const [deleteSingleNotification, { isLoading: isDeleteLoading }] =
    useDeleteSingleNotificationMutation();

  const handleDelete = async () => {
    try {
      await deleteSingleNotification(notification._id).unwrap();
      successToast("Notification deleted successfully");
    } catch (error) {
      errorToast(
        error?.message ||
          error?.data?.message ||
          "Failed to delete notification",
      );
    }
  };

  return (
    <div
      className={clsx(
        "flex-center-start gap-x-5 rounded-xl p-4",
        !notification?.read && "bg-black/20",
      )}
    >
      <div className="rounded-lg bg-[#001D6D] p-4 text-white">
        <Bell size={20} />
      </div>
      <div className="w-full">
        <div className="flex-center-between w-full gap-x-10">
          <h5
            className={clsx(
              "text-lg text-white",
              !notification?.read && "font-bold",
            )}
          >
            {notification?.message}
          </h5>
          <div className="flex items-center gap-x-4">
            <p className="text-white/80">
              {notification?.createdAt &&
                formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                })}
            </p>
            <CustomTooltip title="Delete Notification">
              <CustomConfirm
                description="Are you sure you want to delete this notification?"
                onConfirm={handleDelete}
              >
                <button
                  className="!rounded-full !shadow-none"
                  disabled={isDeleteLoading}
                >
                  <Trash2 className="text-red-500" size={20} />
                </button>
              </CustomConfirm>
            </CustomTooltip>
          </div>
        </div>
        <p
          className={clsx(
            "mt-1 text-white/85",
            !notification?.read && "font-bold",
          )}
        >
          {notification?.description}
        </p>
      </div>
    </div>
  );
}
