import { Button, Modal, Textarea, Typography } from "@mui/joy";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { apiService } from "../../utills/apiService";

interface ReportModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  type: string;
}

function ReportModal({ modalOpen, setModalOpen, id, type }: ReportModalProps) {
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

    onSubmit: () => reportPostHandler(),
  });
  const getRightApi = () => {
    if (type === "post") {
      const data = { postId: id, body: valuesBody };
      return apiService.post.REPORT_POST(data);
    }

    const data = { commentId: id, body: valuesBody };
    return apiService.post.REPORT_COMMENT(data);
  };

  const reportPostHandler = () => {
    const apiToCall = getRightApi();

    apiToCall
      .then(({ data: { message } }) => {
        toast.success(message);
        resetForm();
        setModalOpen(false);
      })
      .catch(
        ({
          response: {
            data: { error },
          },
        }) => {
          toast.error(error);
          setModalOpen(false);
        }
      );
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      className="flex justify-center items-center "
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
          error={touchedBody && Boolean(errorsBody)}
          placeholder="Text (optional)"
          variant="soft"
          className=" flex-1 w-full m-2 p-2 bg-gray-50 !outline-none !border-none rounded-md resize-none "
          endDecorator={
            <Typography className="text-xs ml-auto text-gray-500">
              {300 - valuesBody.length} character(s)
            </Typography>
          }
        />
        <div className="flex w-full justify-around">
          <Button variant="outlined" onClick={() => setModalOpen(false)}>
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

export default ReportModal;
