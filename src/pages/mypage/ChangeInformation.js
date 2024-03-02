import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useDaumPostcodePopup } from "react-daum-postcode";

import memberService from "../../services/member.service";
import IdentificationModal from "../../modal/IdentificationModal";
import AddressModal from "../../modal/AddressModal";
import ConfirmModal from "../../modal/ConfirmModal";
import ExistModal from "../../modal/ExistModal";
import { changeMyProfile } from "../../store/slices/profile-slice";
import Checkbox from "../../components/checkbox/Checkbox";

const ChangeInformation = ({ onCancel }) => {
  const { t } = useTranslation();
  const [birthday, setBirthday] = useState(new Date());
  const [identificationModalShow, setIdentificationModalShow] = useState(false);
  const [existModalShow, setExistModalShow] = useState(false);
  const [addressModalShow, setAddressModalShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [confirmMsg, setConfirmMsg] = useState("");
  const [validPhoneCheck, setValidPhoneCheck] = useState(false);
  const { profile } = useSelector((state) => state.profile);

  const [address, setAddress] = useState("");
  const open = useDaumPostcodePopup();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      const extractKeys = [
        "member_seq",
        "yyyymmdd",
        "login_type",
        "file_seq",
        "file_url",
        "process_seq",
        "agree_use",
        "agree_marketing",
        "agree_location",
        "pw",
      ];
      Object.keys(profile).forEach((key) => {
        if (!extractKeys.includes(key))
          setValue(key, profile[key], { shouldValidate: true });
      });
      setAddress(profile.addr || "");
      setBirthday(moment(String(profile.yyyymmdd), "YYYYMMDD").toDate());
    }
  }, [profile]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  useEffect(() => {}, []);

  const checkDuplicate = () => {
    memberService
      .checkMember({ column_name: "id", column_value: watch("email") })
      .then((req) => {
        if (req.data.data > 0) {
          setExistModalShow(true);
        } else {
          setConfirmMsg(t("Valid_email_msg"));
          setShowConfirm(true);
        }
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "addr") {
      setAddress(e.target.value);
    } else if (e.target.name === "phone") {
      if (validPhoneCheck) {
        setValidPhoneCheck(false);
      }
    }
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

  const handleRequest = (formValue) => {
    if (Object.keys(errors).length > 0) {
      return;
    }
    if (changePassword && formValue.pw !== formValue.confirm_pw) {
      return;
    }
    if (validPhoneCheck) {
      setConfirmMsg(t("Valid_phone_msg"));
      setShowConfirm(true);
      return;
    }
    let requestData = {};
    if (moment(birthday).format("YYYYMMDD") !== String(profile.yyyymmdd)) {
      requestData.yyyymmdd = moment(birthday).format("YYYYMMDD");
    }

    Object.keys(formValue).forEach((key) => {
      if (key !== "confirm_pw") {
        if (formValue[key] !== profile[key]) requestData[key] = formValue[key];
      }
    });

    if (!changePassword) {
      delete requestData.pw;
    }

    if (Object.keys(requestData).length === 0) {
      setConfirmMsg(t("No_CHANGE_INFO"));
      setShowConfirm(true);
      return;
    }
    dispatch(changeMyProfile(requestData))
      .unwrap()
      .then(() => {
        setConfirmMsg(t("SUCCESS_CHANGE_INFO"));
        setShowConfirm(true);
      })
      .catch((err) => {
        setConfirmMsg(err);
        setShowConfirm(true);
      });
  };

  const prevStage = () => {
    onCancel();
  };
  return (
    <div className="w-100">
      <div>
        <div className="d-flex justify-content-center">
          <div className="w-100">
            <form className="mt-30" onSubmit={handleSubmit(handleRequest)}>
              <div className="pr-30 pl-30 pb-35">
                <div className="row-text align-items-center">
                  <div className="col-xl-2 col-sm-5 font-14 lh-18 text-black_1">
                    {t("ID (email)")}
                  </div>
                  <div className="col-xl-3 col-sm-5">
                    <input
                      className={`${
                        errors && errors["email"] ? "border-danger" : ""
                      } input_text`}
                      type="text"
                      name="email"
                      {...register("email", {
                        required: t("required_field"),
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: t("not_email_format"),
                        },
                      })}
                      placeholder={t("Enter Email ID")}
                    />
                    {errors && errors["email"] && (
                      <span className="d-inline-block text-danger mt-1">
                        {errors["email"]?.message}
                      </span>
                    )}
                  </div>
                  {/* <div className="col-xl-1 col-sm-1  font-14 lh-18 text-center">
                    @
                  </div>
                  <div className="col-xl-3 col-sm-5 font-14 text-gray_2 select_container pr-20 pl-20">
                    <select onChange={() => {}}>
                      <option value="default">{t("Select Email")}</option>
                      <option value="priceHighToLow">
                        Price - High to Low
                      </option>
                    </select>
                  </div> */}
                  <div className="col-xl-2 col-sm-4 pl-15">
                    <button
                      type="button"
                      disabled={!watch("email")}
                      onClick={() => {
                        checkDuplicate();
                      }}
                      className="w-100 gray_button text-gray_2 font-14 h-40 d-flex align-items-center justify-content-center"
                    >
                      {t("Duplicate check")}
                    </button>
                  </div>
                </div>
                <div className="row-text align-items-center mt-35">
                  <div className="col-xl-2 col-sm-5 font-14 lh-18 text-black_1">
                    {t("Name")}
                  </div>
                  <div className="col-xl-7 col-sm-5">
                    <input
                      className={`${
                        errors && errors["name"] ? "border-danger" : ""
                      } input_text`}
                      type="text"
                      name="name"
                      {...register("name", {
                        required: t("required_field"),
                      })}
                      placeholder={t("Please enter a subscriber name.")}
                    />
                    {errors && errors["name"] && (
                      <span className="d-inline-block text-danger mt-1">
                        {errors["name"]?.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row-text align-items-center mt-35">
                  <div className="col-xl-2 col-sm-5 font-14 lh-18 text-black_1">
                    {t("Nickname")}
                  </div>
                  <div className="col-xl-7 col-sm-5">
                    <input
                      className={`${
                        errors && errors["nickname"] ? "border-danger" : ""
                      } input_text`}
                      type="text"
                      name="nickname"
                      {...register("nickname", {
                        required: t("required_field"),
                      })}
                      placeholder={t("Nickname")}
                    />
                    {errors && errors["nickname"] && (
                      <span className="d-inline-block text-danger mt-1">
                        {errors["nickname"]?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row-text align-items-center mt-15">
                  <div className="col-xl-2 col-sm-5 font-14 lh-18 text-black_1">
                    {t("Reset Password")}
                  </div>
                  <div className="col-xl-7 col-sm-5">
                    <Checkbox
                      size="lg"
                      round={true}
                      grayBorder
                      checked={changePassword}
                      onChange={() => {
                        setChangePassword(!changePassword);
                      }}
                    />
                  </div>
                </div>
                {changePassword && (
                  <Fragment>
                    <div className="row-text align-items-center mt-35">
                      <div className="col-xl-2 col-sm-5 font-14 lh-18 text-black_1">
                        {t("Password")}
                      </div>
                      <div className="col-xl-7 col-sm-5">
                        <input
                          className={`${
                            errors && errors["pw"] ? "border-danger" : ""
                          } input_text`}
                          type="password"
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
                          placeholder={t("Please enter your PIN number.")}
                        />
                      </div>
                    </div>
                    <div className="row-text align-items-center mt-5">
                      <div className="col-xl-2 col-sm-5" />
                      <div className="col-xl-7 col-sm-5 text-gray_2 font-12">
                        {t(
                          "English (case sensitive) + numeric + special character combination 8 or more characters and no more than 20 characters"
                        )}
                        {errors && errors["pw"] && (
                          <div>
                            <span className="d-inline-block text-danger mt-1">
                              {errors["pw"]?.message}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row-text align-items-center mt-10">
                      <div className="col-xl-2 col-sm-5 font-14 lh-18 text-black_1">
                        {t("Confirm Password")}
                      </div>
                      <div className="col-xl-7 col-sm-5">
                        <input
                          className={`${
                            errors && errors["pw"] ? "border-danger" : ""
                          } input_text`}
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
                          placeholder={t("Please enter your PIN number.")}
                        />
                        <span className="d-inline-block text-danger mt-1">
                          {errors["confirm_pw"]?.message}
                        </span>
                      </div>
                    </div>
                  </Fragment>
                )}

                <div className="row-text align-items-center mt-35">
                  <div className="col-xl-2 col-sm-5 font-14 lh-18 text-black_1">
                    {t("Address")}
                  </div>
                  <div className="col-xl-7 col-sm-5 ">
                    <input
                      className={`${
                        errors && errors["addr"] ? "border-danger" : ""
                      } input_text`}
                      type="text"
                      name="addr"
                      value={address}
                      {...register("addr", {
                        onChange: handleChange,
                        required: t("required_field"),
                      })}
                      placeholder={t("enter_address")}
                    />
                    {errors && errors["addr"] && (
                      <span className="d-inline-block text-danger mt-1">
                        {errors["addr"]?.message}
                      </span>
                    )}
                  </div>
                  <div className="col-xl-2 col-sm-4 pl-15">
                    <button
                      type="button"
                      className="w-100 gray_button text-gray_2 font-14 h-40 d-flex align-items-center justify-content-center"
                      onClick={handleClickAddressSearch}
                    >
                      {t("Address search")}
                    </button>
                  </div>
                </div>
                {/* <div className="row-text align-items-center mt-15">
                    <div className="col-xl-2 col-sm-5"></div>
                    <div className="col-xl-9 col-sm-11">
                      <input
                        className="input_text"
                        type="text"
                        placeholder=""
                        required
                      />
                    </div>
                  </div> */}
                <div className="row-text align-items-center mt-10">
                  <div className="col-xl-2 col-sm-5"></div>
                  <div className="col-xl-9 col-sm-11">
                    <input
                      className="input_text"
                      type="text"
                      name="addr_sub"
                      {...register("addr_sub", {
                        onChange: handleChange,
                        required: t("required_field"),
                      })}
                      placeholder={t("Please enter a detailed address.")}
                    />
                    {errors && errors["addr_sub"] && (
                      <span className="d-inline-block text-danger mt-1">
                        {errors["addr_sub"]?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row-text align-items-center mt-35">
                  <div className="col-xl-2 col-sm-5 font-14 lh-18 text-black_1">
                    {t("Date of birth")}
                  </div>
                  <div className="col-xl-3 col-sm-5">
                    <DatePicker
                      selected={birthday}
                      className="input_text"
                      onChange={(date) => setBirthday(date)}
                    />
                  </div>
                </div>
                <div className="row-text align-items-center mt-35">
                  <div className="col-xl-2 col-sm-5 font-14 lh-18 text-black_1">
                    {t("Gender")}
                  </div>
                  <div className="col-xl-2 col-sm-3 row-text">
                    <input
                      type="radio"
                      name="sex"
                      {...register("sex")}
                      value="M"
                      className="w-21 h-21"
                    />
                    <div className="ml-10 font-14 lh-18 text-gray_2">
                      {t("a man")}
                    </div>
                  </div>
                  <div className="col-xl-2 col-sm-3 row-text">
                    <input
                      type="radio"
                      name="sex"
                      {...register("sex")}
                      value="F"
                      className="w-21 h-21"
                    />
                    <div className="ml-10 font-14 lh-18 text-gray_2">
                      {t("a woman")}
                    </div>
                  </div>
                </div>
                <div className="row-text align-items-center mt-35">
                  <div className="col-xl-2 col-sm-5 font-14 lh-18 text-black_1">
                    {t("Contact information")}
                  </div>
                  <div className="col-xl-7 col-sm-5 ">
                    <input
                      className={`${
                        errors && errors["phone"] ? "border-danger" : ""
                      } input_text`}
                      type="tel"
                      name="phone"
                      {...register("phone", {
                        onChange: handleChange,
                        required: t("required_field"),
                        pattern: {
                          value: /^[0-9]*$/,
                          message: t("not_phone_format"),
                        },
                      })}
                      placeholder={t("Enter without '-'")}
                    />
                    {errors && errors["phone"] && (
                      <span className="d-inline-block text-danger mt-1">
                        {errors["phone"]?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row-text align-items-center mt-30">
                  <div className="col-xl-2 col-sm-5 font-14 lh-18 text-black_1">
                    {t("Identification")}
                  </div>
                  <div className="col-xl-7 col-sm-5 ">
                    <div className="font-14 lh-18 text-black_1">
                      {t("Authenticate with your mobile number")}
                    </div>
                    <div className="font-14 lh-18 text-gray_2">
                      {t(
                        "We authenticate ourselves with your mobile phone number registered with your resident registration number."
                      )}
                    </div>
                  </div>
                  <div className="col-xl-2 col-sm-4 pl-15">
                    <button
                      type="button"
                      onClick={() => {
                        setIdentificationModalShow(true);
                      }}
                      className="w-100 gray_button text-gray_2 font-14 h-40 d-flex align-items-center justify-content-center"
                    >
                      {t("Authenticating")}
                    </button>
                  </div>
                </div>
              </div>
              <div className="line bg-gray"></div>
              <div className="row justify-content-center mt-35">
                <button
                  type="button"
                  className="prev_button mr-30"
                  onClick={prevStage}
                >
                  {t("cancel")}
                </button>
                <button className="next_button border-0px">
                  {t("Modification")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <IdentificationModal
        size="md"
        defaultPhone={watch("phone")}
        show={identificationModalShow}
        onHide={() => setIdentificationModalShow(false)}
        onConfirm={(phoneNum) => {
          setValue("phone", phoneNum, { shouldValidate: true });
          setValidPhoneCheck(true);
          setIdentificationModalShow(false);
        }}
      />
      <ExistModal
        size="md"
        show={existModalShow}
        onHide={() => setExistModalShow(false)}
        onConfirm={() => {
          setExistModalShow(false);
          navigate("/login");
        }}
      />
      <AddressModal
        size="md"
        show={addressModalShow}
        onHide={() => setAddressModalShow(false)}
        onConfirm={() => {
          setAddressModalShow(false);
        }}
      />
      <ConfirmModal
        size="sm"
        show={showConfirm}
        showCancel={false}
        confirmLabel={t("Check")}
        onHide={() => setConfirmMsg("")}
        onConfirm={() => {
          setShowConfirm(false);
          setConfirmMsg("");
        }}
      >
        <span className="mt-3 text-center white-space-pre color-black2">
          {confirmMsg}
        </span>
      </ConfirmModal>
    </div>
  );
};

export default ChangeInformation;
