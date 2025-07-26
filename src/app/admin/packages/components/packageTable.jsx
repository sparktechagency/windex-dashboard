"use client";

import { Table, Button, message } from "antd";
import { Plus, Eye, Edit, Trash2, DollarSign } from "lucide-react";
import { useState } from "react";
import CustomTooltip from "../../../../components/CustomTooltip/CustomTooltip";
import dayjs from "dayjs";
import {
  useGetPackagesQuery,
  useDeletePackageMutation,
} from "../../../../redux/api/packageApi";
import TokenPackageEditModal from "./TokenPackageEditModal";
import TokenPackageAddModal from "./TokenPackageAddModal";
import TokenPriceModal from "./TokenPriceModal";
import TokenPackageViewModal from "./TokenPackageModal";

const TokenPackageTable = ({ limit = 10, showPagination = true }) => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [page, setPage] = useState(1);
  const defaultLimit = 10;
  const apiLimit = limit || defaultLimit;

  // Fetch token packages with pagination
  const {
    data: packagesResponse,
    isFetching,
    isError,
    error,
  } = useGetPackagesQuery({
    page,
    limit: apiLimit,
  });

  const [deleteTokenPackage] = useDeletePackageMutation();

  const packagesData = packagesResponse?.data || [];
  const meta = packagesResponse?.meta || {};

  // Debugging logs
  console.log("TokenPackageTable - packagesResponse:", packagesResponse);
  console.log("TokenPackageTable - page:", page, "limit:", apiLimit);
  console.log("TokenPackageTable - meta:", meta);

  // Map API data to table format
  const tableData = packagesData.map((pkg, index) => ({
    key: (page - 1) * apiLimit + index + 1,
    price: pkg?.price || 0,
    token: pkg?.token || 0,
    createdAt: dayjs(pkg.createdAt).format("DD MMM YYYY"),
    _id: pkg._id,
  }));

  // Limit data to specified limit
  const displayData = limit ? tableData.slice(0, limit) : tableData;

  // Error handling
  if (isError) {
    message.error(error?.data?.message || "Failed to fetch token packages");
  }

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await deleteTokenPackage(id).unwrap();
      message.success("Token package deleted successfully");
    } catch (err) {
      message.error("Failed to delete token package");
    }
  };

  const paginationConfig = showPagination
    ? {
        current: page,
        pageSize: apiLimit,
        total: meta.total || 0,
        onChange: (newPage) => {
          console.log("Pagination changed to page:", newPage);
          setPage(newPage);
        },
        showSizeChanger: false,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} packages`,
        style: { marginTop: "16px", display: "flex" },
      }
    : false;

  const columns = [
    {
      title: "Price",
      dataIndex: "price",
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      title: "Token",
      dataIndex: "token",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <CustomTooltip title="View Details">
            <button
              onClick={() => {
                setModalData(tableData[record.key - 1]);
                setViewModalOpen(true);
              }}
              className="!rounded-full !shadow-none"
            >
              <Eye size={20} />
            </button>
          </CustomTooltip>
          <CustomTooltip title="Edit">
            <button
              onClick={() => {
                setModalData(tableData[record.key - 1]);
                setEditModalOpen(true);
              }}
              className="!rounded-full !shadow-none"
            >
              <Edit size={20} />
            </button>
          </CustomTooltip>
          <CustomTooltip title="Delete">
            <button
              onClick={() => handleDelete(record._id)}
              className="!rounded-full !shadow-none"
            >
              <Trash2 size={20} color="red" />
            </button>
          </CustomTooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="mb-16">
      <style jsx global>{`
        .token-package-table .ant-table-pagination {
          display: flex !important;
          visibility: visible !important;
          margin-top: 16px !important;
        }
      `}</style>
      <section className="my-6">
        <div className="flex-center-between">
          <h4 className="text-[32px] font-semibold text-white">
            Token Packages
          </h4>
          <div className="flex gap-2">
            <Button
              type="primary"
              icon={<Plus size={22} />}
              onClick={() => setAddModalOpen(true)}
              className="h-11 rounded-lg"
            >
              Add New
            </Button>
            <Button
              type="default"
              icon={<DollarSign size={22} />}
              onClick={() => setPriceModalOpen(true)}
              className="h-11 rounded-lg"
            >
              Set Exchange Rate
            </Button>
          </div>
        </div>
        <div className="my-5">
          <Table
            style={{ overflowX: "auto" }}
            className="token-package-table"
            columns={columns}
            dataSource={displayData}
            loading={isFetching}
            pagination={paginationConfig}
            scroll={{ x: "100%" }}
          />
          <TokenPackageViewModal
            open={viewModalOpen}
            setOpen={setViewModalOpen}
            modalData={modalData}
            setModalData={setModalData}
          />
          <TokenPackageAddModal
            open={addModalOpen}
            setOpen={setAddModalOpen}
            setModalData={setModalData}
          />
          <TokenPackageEditModal
            open={editModalOpen}
            setOpen={setEditModalOpen}
            modalData={modalData}
            setModalData={setModalData}
          />
          <TokenPriceModal open={priceModalOpen} setOpen={setPriceModalOpen} />
        </div>
      </section>
    </div>
  );
};

export default TokenPackageTable;
