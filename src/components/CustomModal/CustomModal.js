"use client";

import { Modal } from "antd";
import clsx from "clsx";
import { X } from "lucide-react";

export default function CustomModal({
  open,
  setOpen,
  children,
  title,
  className,
  modalWidth,
}) {
  return (
    <Modal
      title={title}
      centered
      open={open}
      width={modalWidth}
      setOpen={setOpen}
      footer={null}
      closeIcon={false}
      className={clsx("relative", className)}
    >
      <div>{children}</div>

      {/* Close button */}
      <button
        className="absolute right-0 top-0 rounded-bl-3xl bg-danger p-[12px]"
        onClick={() => {
          setOpen(false);
        }}
      >
        <X color="#fff" size={21} />
      </button>
    </Modal>
  );
}
