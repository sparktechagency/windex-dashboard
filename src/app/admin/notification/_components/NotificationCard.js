import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
import { Bell } from "lucide-react";

export default function NotificationCard({ notification }) {
  return (
    <div
      className={clsx(
        "flex-center-start gap-x-5 rounded-xl p-4",
        !notification?.read && "bg-black/20",
      )}
    >
      <div className="rounded-lg bg-[#001D6D] text-white p-4">
        <Bell size={20} className="" />
      </div>

      <div className="w-full">
        <div className="w-full flex-center-between gap-x-10">
          <h5 className="text-lg text-white">{notification?.message}</h5>

          <p className="text-white/80">
            {notification?.createdAt &&
              formatDistanceToNow(notification?.createdAt, { addSuffix: true })}
          </p>
        </div>

        <p className="mt-1 text-white/85">{notification?.description}</p>
      </div>
    </div>
  );
}
