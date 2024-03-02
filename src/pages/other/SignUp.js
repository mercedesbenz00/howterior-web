import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDaumPostcodePopup } from "react-daum-postcode";

import { registerUser, setJoinInfo } from "../../store/slices/join-slice";
import memberService from "../../services/member.service";
import IdentificationModal from "../../modal/IdentificationModal";
import AddressModal from "../../modal/AddressModal";
import ConfirmModal from "../../modal/ConfirmModal";
import ExistModal from "../../modal/ExistModal";
import SEO from "../../components/seo";
import Layout from "../../layouts/Layout";

const SignUp = () => {
  const { t } = useTranslation();
  const [birthday, setBirthday] = useState(new Date());
  const [identificationModalShow, setIdentificationModalShow] = useState(false);
  const [existModalShow, setExistModalShow] = useState(false);
  const [addressModalShow, setAddressModalShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [validPhoneCheck, setValidPhoneCheck] = useState(false);

  const [address, setAddress] = useState("");
  const open = useDaumPostcodePopup();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { joinInfo, agreeRequiredTerms } = useSelector((state) => state.join);

  useEffect(() => {}, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  useEffect(() => {
    if (joinInfo) {
      let values = [];
      Object.keys(joinInfo).forEach((key) => {
        values.push({ [key]: joinInfo[key] });
        setValue(key, joinInfo[key], { shouldValidate: true });
      });
    }
  }, [joinInfo]);

  useEffect(() => {
    if (!agreeRequiredTerms) {
      navigate("/terms_and_condition");
    }
  }, []);

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
    if (formValue.pw !== formValue.confirm_pw) {
      return;
    }
    if (!validPhoneCheck) {
      setConfirmMsg(t("Valid_phone_msg"));
      setShowConfirm(true);
      return;
    }
    let requestData = {};
    let newJoinData = {};
    requestData.yyyymmdd = moment(birthday).format("YYYYMMDD");
    newJoinData.yyyymmdd = requestData.yyyymmdd;

    Object.keys(formValue).forEach((key) => {
      if (
        key === "agree_use" ||
        key === "agree_marketing" ||
        key === "agree_location"
      ) {
        requestData[key] = formValue[key] ? "Y" : "N";
        newJoinData[key] = formValue[key];
      } else if (key !== "confirm_pw") {
        requestData[key] = formValue[key];
        newJoinData[key] = formValue[key];
      }
    });
    requestData.id = requestData.email;
    newJoinData.id = requestData.email;
    dispatch(setJoinInfo(newJoinData));

    dispatch(registerUser(requestData))
      .unwrap()
      .then(() => {
        reset();
        navigate("/signup_complete");
      })
      .catch((err) => {
        setConfirmMsg(err);
        setShowConfirm(true);
      });
  };

  const prevStage = () => {};
  return (
    <Fragment>
      <SEO titleTemplate="Interior" description="Interior of howterior." />
      <Layout headerTop="visible">
        <div className="shop-area pt-80 pb-90 bg-white">
          <div className=" text-center">
            <div className="font-32 fw-bold text-black_1">
              {t("join membership")}
            </div>
          </div>
          <div className="row-text mt-15 font-18 lh-32 align-items-center  justify-content-center">
            <div className="mr-15 text-gray">
              {t("Acceptance of Terms and Conditions and Self-Authentication")}
            </div>
            <img
              className="icon_10_21"
              src={process.env.PUBLIC_URL + "/assets/img/join/right.png"}
            />
            <div className="ml-15 mr-15 fw-500 text-black_1">
              {t("Enter information")}
            </div>
            <img
              className="icon_10_21"
              src={process.env.PUBLIC_URL + "/assets/img/join/right.png"}
            />
            <div className="ml-15 text-gray">{t("Subscription completed")}</div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="col-xl-8 col-sm-10 pr-10 pl-10">
              <form className="mt-60" onSubmit={handleSubmit(handleRequest)}>
                <div className="font-18 fw-normal text-black_1">
                  {t("[Required] Basic member information")}
                </div>
                <div className="line bg-black-line mt-20"></div>
                <div className="pr-30 pl-30 pt-60 pb-35">
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
                    <Link to={process.env.PUBLIC_URL + "/terms_and_condition"}>
                      {t("Previous")}
                    </Link>
                  </button>
                  <button className="next_button border-0px">
                    {t("next")}
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
      </Layout>
    </Fragment>
  );
};

export default SignUp;
