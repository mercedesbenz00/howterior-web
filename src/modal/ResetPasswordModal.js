import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import memberService from "../services/member.service";

function ResetPasswordModal({ onConfirm, onCancel, changePWKey, ...props }) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  useEffect(() => {
    if (props.show) {
      reset();
    }
  }, [props.show]);

  const handleRequest = (formValue) => {
    if (Object.keys(errors).length > 0) {
      return;
    }
    if (formValue.pw !== formValue.confirm_pw) {
      return;
    }
    memberService
      .changePassword({ change_pw_key: changePWKey, pw: formValue.pw })
      .then((res) => {
        if (res.data.success) {
          onConfirm();
        }
      });
  };

  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton className="pb-0">
          <Modal.Title className="font-16">{t("Reset Password")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="mt-60" onSubmit={handleSubmit(handleRequest)}>
            <div className="line bg-gray-2"></div>
            <div className="mt-10 text-black_1 font-12 lh-20">
              {t("Please enter a new number.")}
            </div>
            <div className="text-gray_2 font-12 lh-20">
              {t(
                "English (case-sensitive) + number + special character combination 8 to 20 characters"
              )}
            </div>
            <input
              className="border-gray-1px br-10 bg-white mt-25"
              type="password"
              placeholder={t("New Password")}
              name="pw"
              {...register("pw", {
                required: t("required_field"),
                validate: (val) => {
                  if (
                    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,20}$)/.test(
                      val
                    )
                  ) {
                    return t(
                      "English (case sensitive) + numeric + special character combination 8 or more characters and no more than 20 characters"
                    );
                  }
                },
              })}
            />
            <input
              className="border-gray-1px br-10 bg-white mt-10"
              type="password"
              name="confirm_pw"
              {...register("confirm_pw", {
                required: t("required_field"),
                validate: (val) => {
                  if (watch("pw") != val) {
                    return t("Password_not_match");
                  }
                },
              })}
              placeholder={t("Confirm new password")}
            />
            {(errors["pw"] || errors["confirm_pw"]) && (
              <div className="font-10 lh-18 text_red mt-5">
                {t("Please check the password again.")}
              </div>
            )}
            <div className="mt-20 h-48 row-text mb-30">
              <button
                type="button"
                className="bg-white flex-1 h-100 br-10 border-gray2-1px mr-30 text-gray_2 fw-16 text-center lh-48"
                onClick={onCancel}
              >
                {t("cancel")}
              </button>
              <button className="border-0px flex-1 h-100 br-10 bg-black-1 text-white fw-16 text-center lh-48">
                {t("Change")}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ResetPasswordModal;
