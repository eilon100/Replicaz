import React from "react";
import InputModal from "./InputModal";
interface ReportModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  type: { action: string; type: string };
}
function ModalComponent({
  modalOpen,
  setModalOpen,
  id,
  type: { action, type },
}: ReportModalProps) {
    
  return (
    <div>
      {action === "report" ? (
        <InputModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          id={id}
          type={type}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default ModalComponent;
