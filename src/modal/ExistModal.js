import React from "react";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

function ExistModal({ onConfirm, ...props }) {
  const { t } = useTranslation();
  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton className="pb-0"></Modal.Header>
        <Modal.Body>
          <div className="mt-10 font-14 lh-25 text-black_1 text-center">
            {t("You have subscribed to the information you entered.")}
          </div>
          <div className="font-14 lh-25 text-black_1 text-center">
            {t("Do you want to log in?")}
          </div>
          <div className="mt-10 d-flex justify-content-center mb-25">
            <button className="next_button border-0px" onClick={onConfirm}>
              {t("confirm")}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ExistModal;
