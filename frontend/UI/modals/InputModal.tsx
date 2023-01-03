import React from "react";
import { Modal, Textarea, Typography } from "@mui/joy";
import { useFormik } from "formik";
import { reportValidationSchema } from "../../validation/report";
import { MdClose } from "react-icons/md";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

interface inputModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  functionHandler: (body: string) => void;
}

function InputModal({
  modalOpen,
  setModalOpen,
  functionHandler,
}: inputModalProps) {
  const {
    handleChange,
    handleBlur,
    values: { body: valuesBody },
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: {
      body: "",
    },
    validationSchema: reportValidationSchema,
    onSubmit: (values) => {
      functionHandler(values.body.trim());
      setModalOpen(false);
      resetForm();
    },
  });
  const buttons = () => {
    return (
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
          Send
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
          <h1 className="text-md xs:text-2xl ">Report</h1>
        </div>
        <Textarea
          minRows={4}
          maxRows={4}
          componentsProps={{
            textarea: {
              maxLength: 300,
              dir: "auto",
            },
          }}
          name="body"
          onChange={handleChange}
          onBlur={handleBlur}
          value={valuesBody}
          placeholder="Text"
          variant="soft"
          className=" flex-1 w-full m-2 p-2 bg-second rounded-md border "
          endDecorator={
            <Typography className="text-xs ml-auto text-gray-500">
              {300 - valuesBody.length} character(s)
            </Typography>
          }
        />
        {buttons()}
      </form>
    </Modal>
  );
}

export default InputModal;
