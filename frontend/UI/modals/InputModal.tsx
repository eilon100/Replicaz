import React from "react";
import { Button, Modal, Textarea, Typography } from "@mui/joy";
import { useFormik } from "formik";
import { reportValidationSchema } from "../../validation/report";

interface ReportModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  functionHandler: any;
}

function InputModal({
  modalOpen,
  setModalOpen,
  functionHandler,
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
    validationSchema: reportValidationSchema,
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
      className="flex justify-center items-center bg-[rgba(0,0,0,0.3)] "
    >
      <form
        className="flex flex-col justify-center items-center w-full max-w-xl p-5 mx-5 bg-white rounded-md"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h1 className="font-bold text-xl">Report</h1>
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
          className=" flex-1 w-full m-2 p-2 bg-gray-50 !outline-none !border-none rounded-md resize-none "
          endDecorator={
            <Typography className="text-xs ml-auto text-gray-500">
              {300 - valuesBody.length} character(s)
            </Typography>
          }
        />
        <div className="flex w-full justify-around">
          <Button
            variant="outlined"
            onClick={() => {
              setModalOpen(false);
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button variant="outlined" type="submit">
            Report
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default InputModal;
