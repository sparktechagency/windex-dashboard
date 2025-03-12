import CustomModal from "@/components/CustomModal/CustomModal";
import React from "react";

const RowData = ({ name, value }) => {
  return (
    <div className="mb-10 flex justify-between border-b-2 border-primary-blue">
      <span className="font-samibold -gray-700 text text-xl">{name} :</span>
      <span className="text-xl text-gray-900">{value}</span>
    </div>
  );
};

export default function WishListDetailsModal({ open, setOpen }) {
  const modalData = {
    name: "Justina Ojuylub",
    image:
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    description: "Capturing moments that speak..",
    userName: "Nammi Fatema",
    email: "name@gmail.com",
    date: "27 Feb 2025",
    token: "25.5k",
    trnId: "12sddfe45x",
    status: "pending",
  };

  return (
    <CustomModal open={open} setOpen={setOpen} title="Wishlist Details">
      <div className="my-10">
        <RowData name="User Name " value={modalData?.userName} />
        <RowData name="Email " value={modalData?.email} />
        <RowData name="Status " value={modalData?.status} />
        <RowData name="Token Amount " value={modalData?.token} />
        <RowData name="Transiction ID " value={modalData?.trnId} />
        <RowData name="Date " value={modalData?.date} />
      </div>
    </CustomModal>
  );
}
