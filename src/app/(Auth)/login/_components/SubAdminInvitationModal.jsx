"use client";

import { useState } from "react";
import { Modal, Button, Form, Select, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAddSubAdminMutation } from "@/redux/api/userApi.js";
import { SuccessModal, ErrorModal } from "@/utils/modalHook.js";

// Zod schema
const subAdminInvitationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  contractNumber: z.string().min(1, "Contact number is required"),
  permission: z.string().min(1, "Permission is required"),
});

export default function SubAdminInvitationModal({ open, setOpen }) {
  const [addAdmin, { isLoading }] = useAddSubAdminMutation();
  const [formError, setFormError] = useState(null);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(subAdminInvitationSchema),
    defaultValues: {
      name: "",
      email: "",
      contractNumber: "",
      permission: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await addAdmin(data).unwrap();

      if (res?.success) {
        SuccessModal("Invitation sent successfully!");
        setFormError(null);
        reset();
        setOpen(false);
      }
    } catch (err) {
      setFormError(
        err?.data?.message || err?.error || "Failed to send invitation",
      );
      ErrorModal(err?.data?.message || "Failed to send invitation");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={700}
      title={
        <h2 className="text-2xl font-normal text-gray-600">
          Sub Admin Invitation
        </h2>
      }
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Full Name"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Input {...field} placeholder="Enter name" size="large" />
              </Form.Item>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Email"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter email"
                  size="large"
                />
              </Form.Item>
            )}
          />

          {/* Contact Number */}
          <Controller
            name="contractNumber"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Contact Number"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Input
                  {...field}
                  placeholder="Enter contact number"
                  size="large"
                />
              </Form.Item>
            )}
          />

          {/* Permission Select */}
          <Controller
            name="permission"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Form.Item
                label="Permission"
                validateStatus={error ? "error" : ""}
                help={error?.message}
              >
                <Select
                  {...field}
                  placeholder="Select permission"
                  onChange={(value) => field.onChange(value)}
                  value={field.value || undefined}
                  options={[
                    { label: "Order Support", value: "order_support" },
                    { label: "Finance", value: "finance" },
                    { label: "Content Reviewer", value: "content_reviewer" },
                    { label: "Viewer", value: "viewer" },
                  ]}
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            )}
          />
        </div>

        {/* Buttons */}
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

        {formError && <div className="mt-2 text-red-500">{formError}</div>}
      </Form>
    </Modal>
  );
}
