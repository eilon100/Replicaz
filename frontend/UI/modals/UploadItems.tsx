import React from "react";
import { Modal, Textarea, Typography } from "@mui/joy";
import { useFormik } from "formik";
import { MdClose } from "react-icons/md";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

interface ReportModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  functionHandler: any;
  page: string;
}

function UploadItemsModal({
  modalOpen,
  setModalOpen,
  functionHandler,
  page,
}: ReportModalProps) {
  const {
    handleChange,
    handleBlur,
    values: { body: valuesBody },
    touched: { body: touchedBody },
    errors: { body: errorsBody },
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: {
      body: "",
    },

    onSubmit: (values) => {
      functionHandler(values.body.trim());
      setModalOpen(false);
      resetForm();
    },
  });

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      className="flex justify-center items-center bg-rgba(0,0,0,0.3)"
    >
      <form
        className="flex flex-col items-center justify-center w-full max-w-xl  mx-5 p-4 bg-main rounded-md shadow-sm border"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div
          className="w-full flex justify-end cursor-pointer "
          onClick={() => setModalOpen(false)}
        >
          <MdClose className="text-gray-400 text-2xl" />
        </div>
        <div className="flex flex-col items-center gap-5 font-bold mb-3">
          <h1 className="text-md xs:text-2xl ">Upload {page}</h1>
        </div>
        <div className="flex items-center">
          <h1>{page} name:</h1>
        </div>

        <div className="flex w-full justify-end mt-3">
          <Button
            variant="text"
            type="reset"
            className=" font-semibold text-black text-xs h-8 p-3 xs:text-sm xs:h-10 xs:p-4"
            onClick={() => {
              setModalOpen(false);
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            style={{
              backgroundColor: "#1183ca",
            }}
            variant="contained"
            endIcon={<SendIcon />}
            className=" rounded-md mx-1 text-xs h-8 p-3 xs:text-sm xs:h-10 xs:p-4"
          >
            Upload
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default UploadItemsModal;
