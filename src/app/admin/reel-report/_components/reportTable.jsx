"use client";

import { Table, Tag, Input, message } from "antd";
import { Search, CircleAlert } from "lucide-react";
import { useState } from "react";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import { debounce } from "lodash";
import dayjs from "dayjs";
import ReportModal from "./ReportModal";
import { useGetAllReportsQuery } from "@/redux/api/reportApi";

const ReportReviewTable = ({ limit = 10, showPagination = true }) => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const defaultLimit = 10;
  const apiLimit = limit || defaultLimit;

  // Debounced search handler
  const debouncedSetSearchText = debounce((value) => {
    setSearchText(value);
    setPage(1); // Reset to page 1 on search
  }, 500);

  // Fetch reports with pagination, search, and modelType filter
  const {
    data: reportsResponse,
    isFetching,
    isError,
    error,
  } = useGetAllReportsQuery({
    page,
    limit: apiLimit,
    searchTerm: searchText,
    modelType: "Reels",
  });

  const reportsData = reportsResponse?.data || [];
  const meta = reportsResponse?.meta || {};

  // Map API data to table format
  const tableData = reportsData.map((report, index) => {
    const reportedReel = {
      description: report?.refference?.description || "N/A",
      content: report?.refference?.content?.[0] || "N/A",
      name: report?.refference?.author?.name || "N/A",
      email: report?.refference?.author?.email || "N/A",
      image:
        report?.refference?.author?.photoUrl ||
        "https://via.placeholder.com/50",
      audience: report?.refference?.audience || "N/A",
    };

    return {
      key: (page - 1) * apiLimit + index + 1,
      user: reportedReel,
      reason: report.reason,
      date: dayjs(report.createdAt).format("DD MMM YYYY"),
      status: report.status,
      _id: report._id,
      modelType: report.modelType,
      author: report.author, // Include author for modal
    };
  });

  // Limit data to specified limit
  const displayData = limit ? tableData.slice(0, limit) : tableData;

  // Error handling
  if (isError) {
    message.error(error?.data?.message || "Failed to fetch reports");
  }

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
          `${range[0]}-${range[1]} of ${total} reports`,
        style: { marginTop: "16px", display: "flex" },
      }
    : false;

  const columns = [
    {
      title: "Reported Reel",
      dataIndex: "user",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <div>
            <p className="font-semibold">{value.description}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Reason",
      dataIndex: "reason",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag
          color={
            value === "approved"
              ? "green"
              : value === "denied"
                ? "red"
                : "orange"
          }
          className="capitalize"
        >
          {value}
        </Tag>
      ),
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Approved", value: "approved" },
        { text: "Denied", value: "denied" },
      ],
      onFilter: (value, record) => record?.status?.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Action",
      dataIndex: "",
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <CustomTooltip title="View Details">
            <button
              onClick={() => {
                setModalData(tableData[record.key - 1]);
                console.log("record", record);
                setOpen(true);
              }}
              className="!rounded-full !shadow-none"
            >
              <CircleAlert size={20} />
            </button>
          </CustomTooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="mb-16">
      <style jsx global>{`
        .report-review-table .ant-table-pagination {
          display: flex !important;
          visibility: visible !important;
          margin-top: 16px !important;
        }
      `}</style>
      <section className="my-6">
        <div className="flex-center-between">
          <h4 className="text-[32px] font-semibold text-white">Reel Reports</h4>
          <div className="w-1/3">
            <Input
              placeholder="Search..."
              prefix={<Search className="mr-1 text-gray-400" size={22} />}
              className="!border-secondary h-11 !w-full !rounded-lg !border !text-base"
              onChange={(e) => debouncedSetSearchText(e.target.value)}
            />
          </div>
        </div>
        <div className="my-5">
          <Table
            style={{ overflowX: "auto" }}
            className="report-review-table"
            columns={columns}
            dataSource={displayData}
            loading={isFetching}
            pagination={paginationConfig}
            scroll={{ x: "100%" }}
          />
          <ReportModal
            open={open}
            setOpen={setOpen}
            modalData={modalData}
            setModalData={setModalData}
          />
        </div>
      </section>
    </div>
  );
};

export default ReportReviewTable;
