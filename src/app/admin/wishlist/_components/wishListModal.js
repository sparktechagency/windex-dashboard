import CustomModal from "@/components/CustomModal/CustomModal";
import React from "react";

const RowData = ({ name, value }) => {
  return (
    <div className="mb-10 flex justify-between border-b-2 border-primary-blue">
      <span className="font-semibold text-gray-700 text-xl">{name} :</span>
      <span className="text-xl text-gray-900">{value || "N/A"}</span>
    </div>
  );
};

export default function WishListDetailsModal({ open, setOpen, wishlist }) {
  return (
    <CustomModal open={open} setOpen={setOpen} title="Wishlist Details">
      <div className="my-10">
        <RowData name="User Name" value={wishlist?.userName} />
        <RowData name="Email" value={wishlist?.email} />
        <RowData name="Title" value={wishlist?.title} />
        <RowData name="Status" value={wishlist?.status} />
        <RowData name="Token Amount" value={wishlist?.token} />
        <RowData name="Transaction ID" value={wishlist?.trnId} />
        <RowData name="Date" value={wishlist?.date} />
      </div>
    </CustomModal>
  );
}