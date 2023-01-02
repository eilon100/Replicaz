import React from "react";
import { Modal } from "@mui/joy";
import Button from "@mui/material/Button";
import { MdOutlineDeleteOutline, MdClose } from "react-icons/md";
interface ReportModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  functionHandler: () => void;
  action: string;
  page: string;
}

function ConfirmModal({
  modalOpen,
  setModalOpen,
  functionHandler,
  action,
  page,
}: ReportModalProps) {
  const onSubmit = () => {
    functionHandler();
    setModalOpen(false);
  };

  const buttons = () => {
    return (
      <div className="flex w-full justify-end ">
        <Button
          variant="text"
          type="reset"
          className=" font-semibold text-black text-xs h-8 p-3 xs:text-sm xs:h-10 xs:p-4"
          onClick={() => {
            setModalOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          style={{
            backgroundColor: "rgb(239 68 68)",
          }}
          variant="contained"
          className=" rounded-md mx-1 text-xs h-8 p-3 xs:text-sm xs:h-10 xs:p-4"
        >
          {action === "delete" ? "Delete" : ""}
        </Button>
      </div>
    );
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      className="flex justify-center items-center bg-rgba(0,0,0,0.3)"
    >
      <form
        className="flex flex-col items-center justify-center w-full max-w-xl  mx-5 p-4 bg-main rounded-md shadow-sm border"
        onSubmit={() => {
          onSubmit();
        }}
      >
        <div
          className="w-full flex justify-end cursor-pointer "
          onClick={() => setModalOpen(false)}
        >
          <MdClose className="text-gray-400 text-2xl" />
        </div>
        <div className="flex flex-col items-center gap-5 font-bold my-3">
          <MdOutlineDeleteOutline className=" text-red-500 text-5xl xs:text-7xl" />
          <h1 className="text-md xs:text-2xl ">
            {action === "delete" ? `You are about to delete this ${page}` : ""}
          </h1>
          <div className="flex flex-col items-center text-gray-400 text-xs xs:text-base">
            <p>
              This will delete your {page} from the{" "}
              {page === "post" ? "feed" : page === "comment" ? "post" : ""}
            </p>
            <p>Are you sure?</p>
          </div>
        </div>
        {buttons()}
      </form>
    </Modal>
  );
}

export default ConfirmModal;
