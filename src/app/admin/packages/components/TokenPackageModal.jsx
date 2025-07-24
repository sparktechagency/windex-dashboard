"use client";

import CustomModal from "@/components/CustomModal/CustomModal";
import { Package } from "lucide-react";
import React from "react";

const RowData = ({ name, value }) => {
  return (
    <div className="border-primary-blue mb-10 flex justify-between border-b-2">
      <span className="text-xl font-semibold text-gray-700">{name} :</span>
      <span className="text-xl text-gray-900">{value || "N/A"}</span>
    </div>
  );
};

export default function TokenPackageViewModal({
  open,
  setOpen,
  modalData,
  setModalData,
}) {
  return (
    <CustomModal
      modalWidth={800}
      open={open}
      setOpen={setOpen}
      title="Token Package Details"
    >
      <div className="m-10">
        <div className="flex flex-col items-center justify-center gap-6">
          <Package size={50} color="var(--primary-black)" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Token Package
          </h2>
        </div>
        <div className="my-5">
          <RowData
            name="Price"
            value={`$${modalData?.price?.toFixed(2) || "N/A"}`}
          />
          <RowData name="Token" value={modalData?.token} />
          <RowData name="Created At" value={modalData?.createdAt} />
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              setOpen(false);
              setModalData(null);
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </CustomModal>
  );
}
