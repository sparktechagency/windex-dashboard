import CustomModal from "@/components/CustomModal/CustomModal";
import { MessageSquareWarning } from "lucide-react";
import { MessageCircleWarning } from "lucide-react";
import React from "react";

const RowData = ({ name, value }) => {
  return (
    <div className="flex justify-between mb-10 border-b-2 border-primary-blue">
      <span className="text-xl font-samibold -gray-700 text">{name} :</span>
      <span className="text-xl text-gray-900">{value}</span>
    </div>
  );
};

export default function ReportModal({
  open,
  setOpen,
  modalData,
  setModalData,
}) {
  return (
    <CustomModal open={open} setOpen={setOpen} title="">
       <div className="m-10 ">
        <div className="flex flex-col items-center justify-center gap-6">
        <MessageSquareWarning size={50} color={"var(--primary-black)"}/>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Report
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
          Personal attacks, threats, or repeated harmful messages targeting
          someone.
        </p>
      </div>
      <div className="flex justify-between mt-6">
        <button onClick={()=> setOpen(false)} className="w-1/2 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
          Cancel
        </button>
        <button className="w-1/2 py-2 ml-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Accept
        </button>
        </div>
       </div>
      
      {/* <div className="flex flex-col items-center gap-5 text-center">
        <div className="my-5">
          <MessageSquareWarning size={50} />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Report
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Personal attacks, threats, or repeated harmful messages targeting
          someone.
        </p>
      </div>
      <div className="flex justify-between mt-6">
        <button className="w-1/2 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
          Cancel
        </button>
        <button className="w-1/2 py-2 ml-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Accept
        </button>
      </div> */}
    </CustomModal>
  );
}
