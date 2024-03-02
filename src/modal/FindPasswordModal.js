import React from "react";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { sendSMS } from "../store/slices/auth-slice";

function FindPasswordModal({ onConfirm, ...props }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);
  const [smsCode, setSMSCode] = useState("");
  const [inputSMSCode, setInputSMSCode] = useState("");
  const [countTimeText, setCountTimeText] = useState("");

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setStep(1);
    setShowError(false);
    setSMSCode("");
    setInputSMSCode("");
    setTimeLeft(0);
  }, [props.show]);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      decrement();
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  const countdown = () => {
    setCountTimeText(`03:00`);
    setTimeLeft(180);
  };

  const getMinutes = () => {
    return Math.floor(timeLeft / 60);
  };
  function getSeconds() {
    return timeLeft % 60;
  }

  const decrement = () => {
    if (timeLeft <= 0) {
      setSMSCode("");
      return;
    }
    if (timeLeft < 10) {
      setCountTimeText(`00:0${timeLeft}`);
    } else if (timeLeft <= 59) {
      setCountTimeText(`00:${timeLeft}`);
    } else {
      let countSecs = getSeconds();
      if (countSecs >= 0) {
        if (countSecs < 10) {
          setCountTimeText(`0${getMinutes()}:0${countSecs}`);
        } else {
          setCountTimeText(`0${getMinutes()}:${countSecs}`);
        }
      }
    }
  };

  const handleSendSMS = () => {
    dispatch(sendSMS({ phone }))
      .unwrap()
      .then((data) => {
        if (!data.success) {
          setShowError(true);
        } else {
          countdown();
          setShowError(false);
          setSMSCode(data.data.auth_number);
        }
      })
      .catch(() => {
        setShowError(true);
      });
  };

  const checkSMSCode = () => {
    if (inputSMSCode.length > 0 && smsCode === inputSMSCode) {
      setShowError(false);
      onConfirm(phone, email);
    } else {
      setShowError(true);
    }
  };
  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton className="pb-0">
          <Modal.Title className="font-16">{t("forgot_password")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="line bg-gray-2"></div>
          {step === 1 && (
            <div className="pb-30">
              <div className="font-14 fw-400 lh-25 mt-25 text-gray_2">
                {t(
                  "Please select the method of identification and proceed with the identification verification"
                )}
              </div>
              <div className="font-16 fw-500 lh-25 mt-30  text-black_1">
                {t("Find with your own authentication")}
              </div>
              <button
                className="mt-5 pt-20 pb-30 border-gray1-1px br-10 text-center bg-white w-100"
                onClick={() => {
                  setStep(2);
                }}
              >
                <div className="font-12 lh-25 fw-normal text-black_1">
                  {t("Find by Mobile Number")}
                </div>
                <div className="font-10 lh-15 fw-400 text-gray_2 mt-10">
                  {t(
                    "We authenticate ourselves with your mobile phone number registered with your resident registration number._1"
                  )}
                </div>
                <div className="font-10 lh-15 fw-400 text-gray_2">
                  {t(
                    "We authenticate ourselves with your mobile phone number registered with your resident registration number._2"
                  )}
                </div>
                <div className="mt-10 font-14 lh-25 fw-normal text-black_1">
                  {t("Authenticating")} {"  >"}
                </div>
              </button>
            </div>
          )}
          {step > 1 && (
            <div>
              <div className="mt-10 font-12 lh-25">
                {t("Find by Mobile Number")}
              </div>
              <div className="font-10 lh-16 text-gray_2 mt-5">
                {t(
                  "You can find it with the mobile phone number registered in the membership information."
                )}
              </div>
              <input
                className="border-gray-1px br-10 bg-white mt-20"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder={t("Plese input id.")}
                required
              />
              <input
                className="border-gray-1px br-10 bg-white mt-20"
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder={t("Enter without '-'")}
                required
              />
              {step === 3 && showError && (
                <div className="font-10 lh-18 text_red mt-5">
                  {t("Please check your cell phone number again.")}
                </div>
              )}
              <button
                disabled={!phone || !email}
                className="w-100 border-gray-1px br-10 h-45 bg-white mt-15 text-gray_2 d-flex align-items-center justify-content-center"
                onClick={() => {
                  handleSendSMS();
                  setStep(3);
                }}
              >
                {step === 2
                  ? t("Send authentication number")
                  : t("Resend authentication number")}
              </button>
              {step === 3 && (
                <div className="border-gray-1px br-10 h-47 mt-20 pr-15 pl-1 row-text align-items-center">
                  <input
                    className="  bg-white border-0px br-10 pt-0 pb-0"
                    type="text"
                    value={inputSMSCode}
                    onChange={(e) => {
                      setInputSMSCode(e.target.value);
                    }}
                    placeholder={t("Enter without '-'")}
                    required
                  />
                  {timeLeft > 0 && (
                    <div className="font-12 text_red">{countTimeText}</div>
                  )}
                </div>
              )}
              {step === 3 && showError && (
                <div className="font-10 lh-18 text_red mt-5">
                  {t("Please check the authentication number again.")}
                </div>
              )}
              <div className="mt-30 d-flex justify-content-center mb-30">
                <button
                  disabled={inputSMSCode.length === 0}
                  className="next_button  border-0px"
                  onClick={checkSMSCode}
                >
                  {t("confirm")}
                </button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FindPasswordModal;
