import React from "react";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
function ResetedPasswordModal({ onConfirm, ...props }) {
  const { t } = useTranslation();
  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton className="pb-0">
          <Modal.Title className="font-16"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font-16 fw-500 lh-25 mt-15 text-black_1 text-center">
            {t("Your password has been reset.")}
          </div>
          <div className="mt-25 d-flex justify-content-center mb-30">
            <button className="next_button border-0px" onClick={onConfirm}>
              {t("confirm")}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ResetedPasswordModal;
