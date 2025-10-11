"use client";

import { Modal } from "antd";
import userImage from "@/assets/images/user-avatar-lg.png";
import Image from "next/image";
import { Tag } from "antd";

export default function ProfileModal({ open, setOpen, user }) {
  return (
    open &&
    user && (
      <Modal
        title="User Details"
        centered
        open={open}
        setOpen={setOpen}
        footer={null}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <div className="relative flex flex-col items-center gap-4 rounded-lg bg-primary py-4">
          <Image
            src={user?.userImg || userImage}
            alt="user image"
            height={2400}
            width={2400}
            className="aspect-square h-auto w-[30%] rounded-full"
          />

          <h4 className="text-3xl font-bold text-white">{user?.name}</h4>

          {/* Status */}
          <p className="absolute right-3 top-3">
            <Tag color="green" className="!mt-1 !rounded-full font-medium">
              {user?.status}
            </Tag>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 px-8 py-8 md:grid-cols-2">
          <div className="text-black">
            <h5 className="font-bold">Name</h5>
            <p className="text-base">{user?.name}</p>
          </div>
          <div className="text-black">
            <h5 className="font-bold">Email</h5>
            <p className="text-base">{user?.email}</p>
          </div>
          <div className="text-black">
            <h5 className="font-bold">Address</h5>
            <p className="text-base">{user?.address || "N/A"}</p>
          </div>

          <div className="text-black">
            <h5 className="font-bold">Joined</h5>
            <p className="text-base">{user?.date}</p>
          </div>

          <div className="text-black">
            <h5 className="font-bold">Phone</h5>
            <p className="text-base">{user?.contractNumber || "N/A"}</p>
          </div>
        </div>
      </Modal>
    )
  );
}
