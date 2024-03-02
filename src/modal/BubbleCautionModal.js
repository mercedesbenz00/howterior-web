import React from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

function BubbleCautionModal({ onConfirm, ...props }) {
  const { t } = useTranslation();
  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="w-100 text-center pb-30">
            <span className="f-size-32 fw-500 color-black2 ls-minus-2 lh-base">
              {t("start_quotation")}
            </span>
            <span className="d-inline-block mt-15 text-start f-size-13 white-space-pre color-black4 ls-minus-1 lh-base">
              {t("bubble_caution_dialog_text1")}
            </span>
            <span className="d-inline-block mt-55 f-size-20 fw-bold color-black2 lh-base">
              {t("bubble_caution_dialog_subtitle1")}
            </span>
            <div className="mt-15">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/assets/img/bubble/bubble-quotation.svg"
                }
                alt=""
              />
            </div>
            <span className="d-inline-block mt-20 f-size-14 fw-500 color-black2 lh-lg">
              1. {t("bubble_caution_dialog_text2")}
            </span>
            <span className="d-inline-block f-size-14 fw-500 color-black2 lh-lg">
              2. {t("bubble_caution_dialog_text3")}
            </span>
            <button className="primary-btn-lg mt-45" onClick={onConfirm}>
              <img
                style={{ marginTop: "-4px" }}
                src={
                  process.env.PUBLIC_URL + "/assets/img/bubble/circle-check.svg"
                }
                alt=""
              />
              <span className="ml-10">
                {t("bubble_caution_dialog_confirm")}
              </span>
            </button>
            <span className="d-inline-block mt-15 f-size-13 color-black4 ls-minus-1 lh-base">
              {t("bubble_caution_dialog_text4")}
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BubbleCautionModal;
