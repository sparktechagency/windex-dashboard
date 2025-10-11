"use client";

import { Modal, Button } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { subAdminInvitationSchema } from "./SubAdminSchema.j/SubadminZod.js";
import { useAddSubAdminMutation } from "@/redux/api/userApi.js";
import { SuccessModal, ErrorModal } from "@/utils/modalHook.js";
import { useState } from "react";
import CustomFormError from "@/components/CustomFormError/CustomFormError";

export default function SubAdminInvitationModal({ open, setOpen }) {
  const [addAdmin, { isLoading }] = useAddSubAdminMutation();
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (data) => {
    try {
      const res = await addAdmin(data).unwrap();

      if (res?.success) {
        SuccessModal("Invitation sent successfully!");
        setFormError(null);
        setOpen(false);
      }
    } catch (error) {
      setFormError(error?.data?.message || error?.error);
      ErrorModal(error?.data?.message || "Failed to send invitation");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={700}
      styles={{
        header: {
          padding: "24px 32px",
          borderBottom: "none",
        },
        body: {
          padding: "0 32px 32px",
        },
      }}
      title={
        <h2 className="text-2xl font-normal text-gray-600">
          Sub Admin Invitation
        </h2>
      }
    >
      <FormWrapper
        defaultValues={{
          name: "",
          email: "",
          contractNumber: "",
        }}
        onSubmit={handleSubmit}
        resolver={zodResolver(subAdminInvitationSchema)}
      >
        <div className="space-y-5 pt-6">
          <UInput
            name="name"
            label="Full name"
            placeholder="Enter name"
            size="large"
            className="!h-12"
          />

          <div className="grid grid-cols-2 gap-4">
            <UInput
              name="email"
              type="email"
              label="Email"
              placeholder="Enter email"
              size="large"
              className="!h-12"
            />

            <UInput
              name="contractNumber"
              label="Contact Number"
              placeholder="Enter Contact number"
              size="large"
              className="!h-12"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <Button
              type="default"
              size="large"
              onClick={() => setOpen(false)}
              className="!h-12 !border-0 !bg-blue-50 !font-medium !text-gray-700 hover:!bg-blue-100"
            >
              Cancel
            </Button>

            <Button
              htmlType="submit"
              type="primary"
              size="large"
              loading={isLoading}
              className="!h-12 !border-0 !bg-sky-400 !font-medium hover:!bg-sky-500"
            >
              {isLoading ? "Sending..." : "Send Invitation"}
            </Button>
          </div>

          {formError && (
            <CustomFormError formError={formError} extraClass="mt-4" />
          )}
        </div>
      </FormWrapper>
    </Modal>
  );
}
