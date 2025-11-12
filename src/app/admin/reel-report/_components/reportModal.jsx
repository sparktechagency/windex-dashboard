"use client";

import CustomModal from "@/components/CustomModal/CustomModal";
import { MessageSquareWarning } from "lucide-react";
import React from "react";
import { useChangeReportStatusMutation } from "@/redux/api/reportApi";
import { message } from "antd";
import { useSelector } from "react-redux";

const RowData = ({ name, value }) => {
  return (
    <div className="border-primary-blue mb-10 flex justify-between border-b-2">
      <span className="text-xl font-semibold text-gray-700">{name} :</span>
      <span className="text-xl text-gray-900">{value || "N/A"}</span>
    </div>
  );
};

export default function ReportModal({
  open,
  setOpen,
  modalData,
  setModalData,
}) {
  const [changeReportStatus] = useChangeReportStatusMutation();
  const user = useSelector((state) => state.auth.user);
  const role = user?.permission;

  const handleStatusChange = async (status) => {
    try {
      await changeReportStatus({
        id: modalData._id,
        data: { status },
      }).unwrap();
      message.success(`Report ${status} successfully`);
      setOpen(false);
      setModalData(null);
    } catch (err) {
      message.error(`Failed to ${status} report`);
    }
  };

  // Reporter details from author object
  const reporter = {
    name: modalData?.author?.name || "N/A",
    email: modalData?.author?.email || "N/A",
  };

  // Reel author and reel details from user object (mapped from refference in ReportReviewTable)
  const reelAuthor = {
    name: modalData?.user?.name || "N/A",
    email: modalData?.user?.email || "N/A",
    description: modalData?.user?.description || "N/A",
    content: modalData?.user?.content || "N/A",
    audience: modalData?.user?.audience || "N/A",
  };

  return (
    <CustomModal
      modalWidth={800}
      open={open}
      setOpen={setOpen}
      title="Reel Report Details"
    >
      <div className="m-10">
        <div className="flex flex-col items-center justify-center gap-6">
          <MessageSquareWarning size={50} color="var(--primary-black)" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Reel Report
          </h2>
        </div>
        <div className="my-5">
          <RowData name="Reporter Name" value={reporter.name} />
          <RowData name="Reporter Email" value={reporter.email} />
          <RowData name="Reel Author Name" value={reelAuthor.name} />
          <RowData name="Reel Author Email" value={reelAuthor.email} />
          <RowData name="Reel Description" value={reelAuthor.description} />
          <RowData name="Audience" value={reelAuthor.audience} />
          <RowData name="Report Reason" value={modalData?.reason} />
          <RowData name="Report Status" value={modalData?.status} />
          <RowData name="Report Date" value={modalData?.date} />
        </div>
        <div
          className={
            role === "viewer"
              ? "mt-6 flex hidden justify-between"
              : "mt-6 block flex justify-between"
          }
        >
          <button
            onClick={() => handleStatusChange("denied")}
            className="w-1/2 rounded-lg border border-gray-300 py-2 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Deny
          </button>
          <button
            onClick={() => handleStatusChange("approved")}
            className="ml-2 w-1/2 rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
          >
            Approve
          </button>
        </div>
      </div>
    </CustomModal>
  );
}
