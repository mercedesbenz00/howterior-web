import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

import memberService from "../services/member.service";

function FindIDResultModal({
  onConfirm,
  phoneNumber,
  onFindPassword,
  ...props
}) {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [errMsg, setErrorMsg] = useState("");
  useEffect(() => {
    if (phoneNumber && props.show) {
      memberService.findMemberId({ phone: phoneNumber }).then((req) => {
        if (req.data.data && req.data.data.length) {
          setEmail(req.data.data[0].id);
        } else {
          setErrorMsg(req.data.errMsg);
        }
      });
    }
  }, [phoneNumber, props.show]);

  useEffect(() => {
    if (!props.show) {
      setEmail("");
      setErrorMsg("");
    }
  }, [props.show]);
  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton className="pb-0">
          <Modal.Title className="font-16">{t("Find ID result")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="line bg-gray-2"></div>
          <div className="w-100 br-10 bg-gray-3 mt-25  lh-45 text-gray_2 font-12 fw-400 row-text justify-content-center">
            <div>{t("Your ID is")}&nbsp;&nbsp;</div>
            {email && <div className="fw-bold">{email}</div>}
            <div>&nbsp;{t("It is.")}</div>
            {!!errMsg && <div className="text_red mt-2">{errMsg}</div>}
          </div>
          <div className="mt-20 h-48 row-text">
            <button
              className="flex-1 h-100 br-10 border-gray2-1px mr-30 text-gray_2 fw-16 text-center lh-48"
              onClick={onFindPassword}
            >
              {t("forgot_password")}
            </button>
            <button
              className="flex-1 h-100 br-10 bg-black-1 text-white fw-16 text-center lh-48 border-0px "
              onClick={onConfirm}
            >
              {t("login_text")}
            </button>
          </div>
          <div className="column align-items-center  mb-15 ">
            <div className="w-190  bg-white mt-25  lh-25 text-black_1 font-12 fw-400 text-center zindex-99">
              {t("Can't you find the ID?")}
            </div>
            <div className="border-gray1-1px br-10 h-74 w-100 mt--12 row-text pt-15 pr-15 pl-15">
              <div>
                <div className="font-14 lh-25 fw-500 text-black_1">
                  {t("Customer Service")}&nbsp; 080-111-1212
                </div>
                <div className="font-10 lh-15 fw-400 text-gray_2">
                  KST 09:00 - 18:00
                </div>
              </div>
              <div className="flex-1"></div>
              <div className="d-flex align-items-center">
                <button className="fw-500 font-10 lh-25 border-gray3-1px pr-5 pl-5 br-3 bg-white">
                  1:1 {t("inquiry")}
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FindIDResultModal;
