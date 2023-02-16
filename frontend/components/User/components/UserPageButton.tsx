import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineReport } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import InputModal from "../../../UI/modals/InputModal";
import { apiService } from "../../../utills/apiService";

function UserPageButton({ reportedUserId, allowToEdit, email }: any) {
  const [reportModal, setReportModal] = useState(false);

  const reportUserHandler = (body: string) => {
    const data = { userId: reportedUserId, body };

    apiService.post
      .REPORT_USER(data)
      .then(({ data: { message } }) => {
        toast.success(message);
      })
      .catch(({ response: { data } }) => {
        toast.error(data.error);
      });
  };

  const forgetPasswordHandler = () => {
    const data = { email };

    apiService.post
      .RESET_PASSWORD(data)
      .then(() => {
        toast.success("Reset password has been sent to your email");
      })
      .catch(({ response: { data } }) => {
        toast.error(data.error);
      });
  };

  const button = () => {
    return allowToEdit ? (
      <button
        className=" w-full  inline-flex justify-center gap-1 items-center
       px-4 py-2  lg:h-12 bg-sky-400 hover:bg-sky-500
        text-white text-xs  lg:text-sm font-medium rounded-full"
        onClick={() => {
          forgetPasswordHandler();
        }}
      >
        <RiLockPasswordLine className="text-xs  lg:text-base" />
        Change password
      </button>
    ) : (
      <button
        className="w-full inline-flex justify-center gap-1 items-center
           px-4 py-2 h-12 bg-gray-400 hover:bg-gray-500
            text-white text-sm font-medium rounded-full"
        onClick={() => {
          setReportModal(true);
        }}
      >
        <MdOutlineReport className="text-base" />
        Report
      </button>
    );
  };

  return (
    <div>
      <InputModal
        modalOpen={reportModal}
        setModalOpen={setReportModal}
        functionHandler={reportUserHandler}
      />
      {button()}
    </div>
  );
}

export default UserPageButton;
