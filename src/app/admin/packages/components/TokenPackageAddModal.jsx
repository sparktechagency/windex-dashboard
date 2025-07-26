"use client";

import CustomModal from "@/components/CustomModal/CustomModal";
import { Package } from "lucide-react";
import React from "react";
import { Form, InputNumber, Button, message } from "antd";
import { useCreatePackageMutation } from "@/redux/api/packageApi";

const TokenPackageAddModal = ({ open, setOpen, setModalData }) => {
  const [form] = Form.useForm();
  const [createPackage, { isLoading }] = useCreatePackageMutation();

  const onFinish = async (values) => {
    try {
      await createPackage(values).unwrap();
      message.success("Token package created successfully");
      setOpen(false);
      form.resetFields();
      setModalData(null);
    } catch (err) {
      message.error("Failed to create token package");
    }
  };

  return (
    <CustomModal
      modalWidth={600}
      open={open}
      setOpen={setOpen}
      title="Add New Token Package"
    >
      <div className="m-10">
        <div className="flex flex-col items-center justify-center gap-6">
          <Package size={50} color="var(--primary-black)" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Create Token Package
          </h2>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ token: null, price: null }}
        >
          <Form.Item
            name="token"
            label="Token"
            rules={[
              { required: true, message: "Please enter the number of tokens" },
              { type: "number", min: 1, message: "Token must be at least 1" },
            ]}
          >
            <InputNumber
              className="w-full"
              placeholder="Enter number of tokens"
            />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please enter the price" },
              { type: "number", min: 0, message: "Price cannot be negative" },
            ]}
          >
            <InputNumber
              className="w-full"
              placeholder="Enter price"
              formatter={(value) => `$ ${value}`}
              parser={(value) => value.replace("$ ", "")}
            />
          </Form.Item>
          <div className="mt-6 flex justify-end gap-2">
            <Button
              onClick={() => {
                setOpen(false);
                form.resetFields();
                setModalData(null);
              }}
              className="border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Create
            </Button>
          </div>
        </Form>
      </div>
    </CustomModal>
  );
};

export default TokenPackageAddModal;
