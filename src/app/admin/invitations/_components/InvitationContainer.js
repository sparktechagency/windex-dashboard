"use client";
import { Button } from "antd";
import InvitationTable from "./InvitationTable";
import { useState } from "react";
import SubAdminInvitationModal from "@/app/(Auth)/login/_components/SubAdminInvitationModal";
import { useSelector } from "react-redux";
export default function InvitationContainer() {
  const [showInvitationModal, setShowInvitationModal] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const role = user?.permission;

  return (
    <div>
      <section className="my-12">
        <div className="flex-center-between">
          <h4 className="text-[32px] font-semibold text-white">Invitations</h4>
          <div
            className={
              role === "viewer"
                ? "mt-6 flex hidden justify-between"
                : "mt-6 block flex justify-between"
            }
          >
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="!h-11 w-full !font-semibold"
              onClick={() => setShowInvitationModal(true)}
            >
              Send Invitation
            </Button>
          </div>
        </div>

        <div className="my-5">
          <InvitationTable showPagination={true} />
        </div>
      </section>
      <SubAdminInvitationModal
        open={showInvitationModal}
        setOpen={setShowInvitationModal}
      />
    </div>
  );
}
