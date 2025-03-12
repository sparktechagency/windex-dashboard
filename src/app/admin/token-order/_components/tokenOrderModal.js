import CustomModal from "@/components/CustomModal/CustomModal";
import React from "react";

const RowData = ({ name, value }) => {
  return (
    <div className="flex justify-between mb-10 border-b-2 border-primary-blue">
      <span className="text-xl font-samibold -gray-700 text">{name} :</span>
      <span className="text-xl text-gray-900">{value}</span>
    </div>
  );
};

export default function TokenOrderModal({
  open,
  setOpen,
  modalData,
  setModalData,
}) {
  return (
    <CustomModal open={open} setOpen={setOpen} title="Token order Details">
      <div className="my-10">
        <RowData name="User Name " value={modalData?.userName} />
        <RowData name="Email " value={modalData?.email} />
        <RowData name="Status " value={modalData?.status} />
        <RowData name="Token Amount " value={modalData?.token} />
        <RowData name="Transiction ID " value={modalData?.trnId} />
        <RowData name="Date " value={modalData?.date} />
      </div>
     {modalData?.status === "completed" && 
     <div className="flex justify-end gap-x-4">
        <button
          onClick={() => {
            setOpen(false);
            setModalData(null);
          }}
          className="rounded-md border border-[#6CC7FE] px-4 py-2 text-black "
        >
          Close
        </button>
        <button
          onClick={() => handleDelete()}
          className="rounded-md bg-[#6CC7FE] px-4 py-2 text-primary-black"
        >
          Accept
        </button>
      </div>}
    </CustomModal>
  );
}
