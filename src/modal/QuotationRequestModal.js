import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useDaumPostcodePopup } from "react-daum-postcode";

import {
  getBubbleProcessList,
  getBubbleRangeList,
  saveBubbleQuote,
} from "../store/slices/bubble-slice";
import { setShowAlert, setErrorMessage } from "../store/slices/message-slice";

import SelectBox from "../components/selectBox/SelectBox";
import fileService from "../services/file.service";

import ConfirmModal from "./ConfirmModal";

function QuotationRequestModal(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [attachMode, setAttachMode] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // const [requesetInfo, setRequestInfo] = useState({});
  const [showCheckBubble, setShowCheckBubble] = useState(false);
  const { bubProcessList } = useSelector((state) => state.bubble);
  const { bubRangeList } = useSelector((state) => state.bubble);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFIleInfo, setUploadedFileInfo] = useState(null);
  const [address, setAddress] = useState("");
  const open = useDaumPostcodePopup();

  const fileInput = useRef(null);
  const quoteRequestData = useRef(null);

  //const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (props.show) {
      reset();
    }
    if (props.show && (!bubProcessList || bubProcessList.length === 0)) {
      dispatch(getBubbleProcessList())
        .unwrap()
        .then(() => {})
        .catch(() => {});
    }
    if (props.show && (!bubRangeList || bubRangeList.length === 0)) {
      dispatch(getBubbleRangeList())
        .unwrap()
        .then(() => {})
        .catch(() => {});
    }
  }, [props.show]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append("files", file);
    fileService
      .uploadFile(formData)
      .then((req) => {
        if (req.success) {
          setUploadedFileInfo(req.data[0]);
        } else if (req.alert) {
          dispatch(setErrorMessage(req.errMsg));
          dispatch(setShowAlert(true));
        }
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  const handleRequest = (formValue) => {
    if (Object.keys(errors).length > 0) {
      return;
    }
    let requestData = {
      type: attachMode ? "F" : "H",
      bubInfoEntities: [],
    };

    if (uploadedFIleInfo) {
      requestData.file_seq = uploadedFIleInfo.file_seq;
    }
    const processPrefix = "bub_process";
    Object.keys(formValue).forEach((key) => {
      if (key.startsWith(processPrefix)) {
        let processId = key.substr(processPrefix.length);
        if (formValue[key]) {
          let bubProcessItem = {
            bub_process_info_seq: Number(processId),
            bub_price: Number(formValue[key]),
          };
          if (formValue["p_count" + processId]) {
            bubProcessItem.p_count = Number(formValue["p_count" + processId]);
          }
          requestData.bubInfoEntities.push(bubProcessItem);
        }
      } else if (key === "area_size") {
        requestData[key] = Number(formValue[key]);
      } else if (key === "interior_scope") {
        requestData["range_up_code"] = "BUB_RANGE";
        requestData["range_info_code"] = formValue[key].value;
      } else if (!key.startsWith("p_count")) {
        requestData[key] = formValue[key];
      }
    });

    if (
      requestData.file_seq !== undefined ||
      requestData.bubInfoEntities.length
    ) {
      quoteRequestData.current = requestData;
      setShowConfirm(true);

      reset();
    }
    // console.log("requestData", requestData);
  };

  const handleChange = (e) => {
    if (e.target.name === "addr") {
      setAddress(e.target.value);
    }
    // console.log("value", e.target.name, e.target.value, typeof e.target.value);
  };

  const handleAddressSearch = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddress(fullAddress);
    setValue("addr", fullAddress, { shouldValidate: true });
  };

  const handleClickAddressSearch = () => {
    open({ onComplete: handleAddressSearch });
  };

  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="w-100 text-center">
            <div className="d-flex gap-3">
              <button
                className={`flex-1 ${
                  attachMode ? "secondary-btn-md" : "primary-btn-md"
                } btn-border`}
                onClick={() => {
                  setAttachMode(false);
                }}
              >
                {t("direct_input")}
              </button>
              <button
                className={`flex-1 ${
                  attachMode ? "primary-btn-md" : "secondary-btn-md"
                } btn-border`}
                onClick={() => {
                  setAttachMode(true);
                }}
              >
                {t("attach_quotation")}
              </button>
            </div>
            <span className="d-inline-block mt-3 text-start f-size-14 white-space-pre color-black4 ls-minus-1 lh-base">
              {t("bubble_input_dialog_text1")}
            </span>
            {/* line */}
            <div className="d-flex mt-36">
              <div className="h-line flex-fill" />
            </div>

            <div className="mt-4 text-start">
              <span className="required">*</span>
              <span className="d-inline-block mt-3 ml-1 text-start f-size-13 white-space-pre color-black4 ls-minus-1 lh-base">
                {t("bubble_input_dialog_text2")}
              </span>
            </div>

            {/* form */}
            <form className="mt-16" onSubmit={handleSubmit(handleRequest)}>
              {/* address */}
              <div className="form-group">
                <span className="form-label">{t("address")}</span>
                <span className="required ml-5">*</span>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <input
                    className={`${
                      errors && errors["addr"] ? "border-danger" : ""
                    } form-control flex-1`}
                    type="text"
                    name="addr"
                    value={address}
                    {...register("addr", {
                      onChange: handleChange,
                      required: t("required_field"),
                    })}
                    placeholder={t("enter_address")}
                  />
                  <button
                    type="button"
                    className="secondary-btn-form"
                    onClick={handleClickAddressSearch}
                  >
                    {t("search_address")}
                  </button>
                </div>
                {errors && errors["addr"] && (
                  <span className="d-inline-block text-danger mt-1">
                    {errors["addr"]?.message}
                  </span>
                )}
                <input
                  className="form-control mt-12"
                  type="text"
                  name="addr_sub"
                  {...register("addr_sub", {
                    onChange: handleChange,
                  })}
                  placeholder={t("bubble_input_dialog_text3")}
                />
              </div>
              {/* area */}
              <div className="form-group">
                <span className="form-label">{t("area_measure")}</span>
                <span className="required ml-5">*</span>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <input
                    className={`${
                      errors && errors["addr"] ? "border-danger" : ""
                    } form-control flex-1 text-start`}
                    type="number"
                    name="area_size"
                    {...register("area_size", {
                      onChange: handleChange,
                      required: t("required_field"),
                    })}
                    placeholder={t("bubble_input_dialog_text4")}
                  />
                  <span className="form-label">{t("pyong")}</span>
                </div>
                {errors && errors["area_size"] && (
                  <span className="d-inline-block text-danger mt-1">
                    {errors["area_size"]?.message}
                  </span>
                )}
              </div>

              {/* interior_scope */}
              <div className="form-group">
                <span className="form-label">{t("interior_scope")}</span>
                <span className="required ml-5">*</span>
                <Controller
                  control={control}
                  name="interior_scope"
                  rules={{
                    required: t("required_field"),
                  }}
                  render={({ field: { onChange, name, value } }) => (
                    <SelectBox
                      className={`${
                        errors && errors["interior_scope"]
                          ? "border-danger"
                          : ""
                      } mt-2`}
                      placeholder={t("bubble_input_dialog_text5")}
                      options={bubRangeList.map((x) => ({
                        value: x.info_code,
                        label: x.name,
                      }))}
                      name={name}
                      value={value}
                      onChange={onChange}
                      ref={null}
                    />
                  )}
                />
                {errors && errors["interior_scope"] && (
                  <span className="d-inline-block text-danger mt-1">
                    {errors["interior_scope"]?.message}
                  </span>
                )}
              </div>

              {/* email */}
              <div className="form-group">
                <span className="form-label">{t("email")}</span>
                <span className="required ml-5">*</span>
                <input
                  className={`${
                    errors && errors["email"] ? "border-danger" : ""
                  } form-control mt-2`}
                  type="text"
                  name="email"
                  {...register("email", {
                    onChange: handleChange,
                    required: t("required_field"),
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: t("not_email_format"),
                    },
                  })}
                  placeholder={t("bubble_input_dialog_text6")}
                />
                {errors && errors["email"] && (
                  <span className="d-inline-block text-danger mt-1">
                    {errors["email"]?.message}
                  </span>
                )}
              </div>

              {/* phone number */}
              <div className="form-group">
                <span className="form-label">{t("phone_number")}</span>
                <input
                  className={`${
                    errors && errors["phone"] ? "border-danger" : ""
                  } form-control mt-2`}
                  type="tel"
                  name="phone"
                  {...register("phone", {
                    onChange: handleChange,
                    pattern: {
                      value: /^[0-9]*$/,
                      message: t("not_phone_format"),
                    },
                  })}
                  placeholder={t("bubble_input_dialog_text7")}
                />
                {errors && errors["phone"] && (
                  <span className="d-inline-block text-danger mt-1">
                    {errors["phone"]?.message}
                  </span>
                )}
              </div>

              {/* direct input part */}
              {!attachMode && (
                <div className="mt-30">
                  {bubProcessList.map((item, i) => (
                    <div key={"direct_input_" + i} className="form-group mb-5">
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className="form-label white-space-pre"
                          style={{ width: "60px" }}
                        >
                          {item.process_name}
                        </span>
                        <OverlayTrigger
                          placement={"top"}
                          overlay={
                            <Tooltip id={`tooltip-direct-${i}`}>
                              {item.content}
                            </Tooltip>
                          }
                        >
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/img/icon-img/bubble/circle_info.svg"
                            }
                            alt=""
                            className="mr-20"
                          />
                        </OverlayTrigger>
                        {item.type === "C" && (
                          <input
                            className="form-control flex-1 text-end"
                            style={{ maxWidth: "92px" }}
                            type="number"
                            name={"p_count" + item.bub_process_info_seq}
                            {...register(
                              "p_count" + item.bub_process_info_seq,
                              {
                                onChange: handleChange,
                              }
                            )}
                            placeholder={t("Count")}
                          />
                        )}
                        <input
                          className="form-control flex-1 text-end"
                          type="number"
                          name={"bub_process" + item.bub_process_info_seq}
                          {...register(
                            "bub_process" + item.bub_process_info_seq,
                            {
                              onChange: handleChange,
                            }
                          )}
                          placeholder={t("bubble_input_placeholder")}
                        />
                        <span className="form-label">{t("yuan")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* upload quotation */}
              <div className="form-group">
                <span className="form-label">{t("upload_quotation")}</span>
                {attachMode && <span className="required ml-5">*</span>}
                <div className="d-flex align-items-center gap-2 mt-2">
                  <input
                    className="form-control flex-1"
                    readOnly
                    type="text"
                    name="file"
                    value={(selectedFile && selectedFile.name) || ""}
                    placeholder={
                      attachMode
                        ? t("bubble_input_dialog_text9")
                        : t("bubble_input_dialog_text8")
                    }
                  />
                  <input
                    ref={fileInput}
                    className="d-none form-control flex-1"
                    type="file"
                    onChange={handleFileInput}
                  />
                  <button
                    type="button"
                    className="secondary-btn-form"
                    onClick={() =>
                      fileInput.current && fileInput.current.click()
                    }
                  >
                    {t("choose_file")}
                  </button>
                </div>
              </div>
              <button className="primary-btn-lg mt-5">
                <span className="mr-10">{t("apply_quotation_comparison")}</span>
                <img
                  style={{ marginTop: "-4px" }}
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/img/icon-img/bubble/arrow_right_btn.svg"
                  }
                  alt=""
                />
              </button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <ConfirmModal
        size="sm"
        show={showConfirm}
        showCancel={true}
        cancelLabel={t("cancel")}
        confirmLabel={t("confirm")}
        onHide={() => setShowConfirm(false)}
        onConfirm={() => {
          if (quoteRequestData.current) {
            dispatch(saveBubbleQuote(quoteRequestData.current))
              .unwrap()
              .then(() => {
                setShowConfirm(false);
                setShowCheckBubble(true);
              })
              .catch(() => {
                setShowConfirm(false);
              });
          }
        }}
      >
        <span className="mt-3 text-center white-space-pre color-black2">
          {t("bubble_input_confirm")}
        </span>
      </ConfirmModal>

      <ConfirmModal
        size="sm"
        show={showCheckBubble}
        showCancel={false}
        confirmLabel={
          attachMode ? t("As the main dish.") : t("view_results_now")
        }
        onHide={() => setShowCheckBubble(false)}
        onConfirm={() => {
          setShowCheckBubble(false);
          props.onHide();
          if (attachMode) {
            navigate("/interior");
          } else {
            navigate("/bubble_check_result");
          }
        }}
      >
        {attachMode && (
          <span className="mt-3 text-center white-space-pre color-black2">
            {t("view_results_later1")}
            <span className="color-black5">{t("view_results_later2")}</span>
            <br />
            <span className="color-black5">{t("view_results_later3")}</span>
            &nbsp;
            {t("view_results_later4")}
            <span className="color-black5">{t("view_results_later5")}</span>
          </span>
        )}
        {!attachMode && (
          <span className="mt-3 text-center white-space-pre color-black2">
            {t("check_bubble_result")}
          </span>
        )}
      </ConfirmModal>
    </>
  );
}

export default QuotationRequestModal;
