"use client";

import CustomModal from "@/components/CustomModal/CustomModal";
import { DollarSign } from "lucide-react";
import React, { useEffect } from "react";
import { Form, InputNumber, Button, message } from "antd";
import {
  useGetContentsQuery,
  useUpdateContentMutation,
} from "@/redux/api/contentApi";

const TokenPriceModal = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const { data: contentResponse, isError, error } = useGetContentsQuery();
  const [updateContent, { isLoading: isUpdating }] = useUpdateContentMutation();

  // Fetch current tokenPrice and set form value
  useEffect(() => {
    if (contentResponse?.data?.[0]?.tokenPrice && open) {
      form.setFieldsValue({
        tokenPrice: contentResponse.data[0].tokenPrice,
      });
    }
  }, [contentResponse, open, form]);

  // Error handling for content fetch
  useEffect(() => {
    if (isError) {
      message.error(error?.data?.message || "Failed to fetch token price");
    }
  }, [isError, error]);

  const onFinish = async (values) => {
    try {
      await updateContent({ tokenPrice: values.tokenPrice }).unwrap();
      message.success("Token price updated successfully");
      setOpen(false);
      form.resetFields();
    } catch (err) {
      message.error("Failed to update token price");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  return (
    <CustomModal
      modalWidth={600}
      open={open}
      setOpen={setOpen}
      title="Set Exchange Rate"
      onCancel={handleCancel}
    >
      <div className="m-10">
        <div className="flex flex-col items-center justify-center gap-6">
          <DollarSign size={50} color="var(--primary-black)" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Update Token Price
          </h2>
        </div>
        <Form
          form={form}
          className="mt-6"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            tokenPrice: null,
          }}
        >
          <Form.Item
            name="tokenPrice"
            label="Token Price (per token)"
            rules={[
              { required: true, message: "Please enter the token price" },
              {
                type: "number",
                min: 0,
                message: "Token price cannot be negative",
              },
            ]}
          >
            <InputNumber
              className="w-full"
              placeholder="Enter token price"
              formatter={(value) => `$ ${value}`}
              parser={(value) => value.replace("$ ", "")}
            />
          </Form.Item>
          <div className="mt-6 flex justify-end gap-2">
            <Button
              onClick={handleCancel}
              className="border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={isUpdating}>
              Update
            </Button>
          </div>
        </Form>
      </div>
    </CustomModal>
  );
};

export default TokenPriceModal;
