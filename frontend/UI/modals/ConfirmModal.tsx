import React from "react";
import { Button, Modal } from "@mui/joy";

interface ReportModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  functionHandler: any;
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

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      className="flex justify-center items-center bg-[rgba(0,0,0,0.3)] "
    >
      <form
        className="flex flex-col h-44 justify-between items-center w-full max-w-xl p-5 mx-5 bg-white rounded-md"
        onSubmit={() => {
          onSubmit();
        }}
      >
        <h1 className="font-bold text-xl">
          {action === "delete"
            ? `Are you sure you want to delete this ${page}?`
            : ""}
        </h1>
        <div className="flex w-full justify-around">
          <Button
            variant="outlined"
            type="reset"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="outlined" type="submit">
            {action === "delete" ? "Delete" : ""}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ConfirmModal;
