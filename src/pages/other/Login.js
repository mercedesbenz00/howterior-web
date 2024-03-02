import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { login } from "../../store/slices/auth-slice";
import { clearMessage } from "../../store/slices/message-slice";
import SEO from "../../components/seo";
import Checkbox from "../../components/checkbox/Checkbox";
import Layout from "../../layouts/Layout";

import FindIDModal from "../../modal/FindIDModal";
import FindIDResultModal from "../../modal/FindIDResultModal";
import FindPasswordModal from "../../modal/FindPasswordModal";
import ResetPasswordModal from "../../modal/ResetPasswordModal";
import ResetedPasswordModal from "../../modal/ResetedPasswordModal";

import memberService from "../../services/member.service";
import { getMyProfile } from "../../store/slices/profile-slice";

const Login = () => {
  const { t } = useTranslation();
  const [passwordType, setPasswordType] = useState("password");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [findIDModalShow, setFindIDModalShow] = useState(false);
  const [findIDResultModalShow, setFindIDResultModalShow] = useState(false);
  const [findPasswordModalShow, setFindPasswordModalShow] = useState(false);
  const [resetPasswordModalShow, setResetPasswordModalShow] = useState(false);
  const [resetedPasswordModalShow, setResetedPasswordModalShow] =
    useState(false);

  const [changePWKey, setChangePWKey] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { errorMessage } = useSelector((state) => state.message);
  const { register, handleSubmit } = useForm();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    if (!username || !password) return;
    setLoading(true);

    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        dispatch(getMyProfile());
        const redirectTo = searchParams.get("redirectTo");
        redirectTo ? navigate(`${redirectTo}`) : navigate("/interior");
        // window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // const handleSocialLogin = (platform) => {
  //   dispatch(socialLogin({ platform }));
  // };

  if (isLoggedIn) {
    return <Navigate to="/interior" />;
  }

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const onRememberMeChange = () => {
    setRememberMe((prev) => !prev);
  };

  const handleChangeID = () => {
    if (errorMessage) {
      dispatch(clearMessage());
    }
  };

  const handleChangePassword = () => {
    if (errorMessage) {
      dispatch(clearMessage());
    }
  };
  return (
    <Fragment>
      <SEO titleTemplate="Login" description="Login page of howterior." />
      <Layout headerTop="visible">
        <div className="login-register-area bg-gray-main pt-80 pb-290">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-md-6 col-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <div className="login-form-container">
                    <div className="login-register-form">
                      <h2 className="fw-bold color-black2 text-center mb-16">
                        {t("login_text")}
                      </h2>
                      <h4 className="fw-normal color-black3 text-center mb-32">
                        {t("welcome_howterior")}
                      </h4>
                      <form onSubmit={handleSubmit(handleLogin)}>
                        <input
                          className={`${
                            errorMessage ? "border-danger" : "mb-16"
                          }`}
                          type="text"
                          name="username"
                          {...register("username", {
                            onChange: handleChangeID,
                          })}
                          placeholder={t("email")}
                        />
                        {errorMessage && (
                          <span className="d-inline-block text-danger mb-16">
                            {errorMessage}
                          </span>
                        )}
                        <div className="position-relative">
                          <input
                            className={`pe-5 ${
                              errorMessage ? "border-danger" : "mb-16"
                            }`}
                            type={passwordType}
                            name="password"
                            {...register("password", {
                              onChange: handleChangePassword,
                            })}
                            placeholder={t("password")}
                          />

                          {errorMessage && (
                            <span className="d-inline-block text-danger  mb-16">
                              {errorMessage}
                            </span>
                          )}
                          <button
                            type="button"
                            className="position-absolute border-0 bg-transparent eye-button"
                            onClick={togglePassword}
                          >
                            {passwordType === "password" ? (
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/img/icon-img/eye_closed.png"
                                }
                                alt=""
                              />
                            ) : (
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/img/icon-img/eye_closed.png"
                                }
                                alt=""
                              />
                            )}
                          </button>
                        </div>
                        <div className="button-box text-center">
                          <div className="login-toggle-btn d-flex justify-content-between">
                            <Checkbox
                              id="remember_me"
                              showBase
                              label={t("remember_me")}
                              labelClassName="color-black4"
                              checked={rememberMe}
                              onChange={() => {
                                onRememberMeChange();
                              }}
                            />
                            <div
                              className="color-black5"
                              // to={process.env.PUBLIC_URL + "/"}
                            >
                              <span
                                className="cursor-pointer"
                                onClick={() => {
                                  setFindIDModalShow(true);
                                }}
                              >
                                {t("username")}
                              </span>
                              &nbsp;&nbsp;|&nbsp;&nbsp;
                              <span
                                className="cursor-pointer"
                                onClick={() => {
                                  setFindPasswordModalShow(true);
                                }}
                              >
                                {t("forgot_password")}
                              </span>
                            </div>
                          </div>
                          <button
                            disabled={loading}
                            className="primary-btn-sm w-100 mt-16"
                            type="submit"
                          >
                            {loading && (
                              <span className="spinner-border spinner-border-sm mr-5"></span>
                            )}
                            <span>{t("login_text")}</span>
                          </button>

                          <button className="secondary-btn mt-30">
                            <a
                              className="p-3"
                              href={
                                process.env.PUBLIC_URL + "/terms_and_condition"
                              }
                            >
                              {t("sign_up")}
                            </a>
                          </button>
                          {/* <div className="d-flex mt-36 align-items-center gap-2">
                            <div className="h-line flex-fill" />
                            <span className="color-black5">
                              {t("single_sign_on")}
                            </span>
                            <div className="h-line flex-fill" />
                          </div>
                          <div className="d-flex mt-20 align-items-center justify-content-between">
                            <button
                              className="social-btn bg-social-yellow"
                              type="button"
                              onClick={() => {
                                handleSocialLogin("kakao");
                              }}
                            >
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/img/icon-img/social_talk.png"
                                }
                                alt=""
                              />
                            </button>
                            <button
                              className="social-btn bg-social-green"
                              type="button"
                              onClick={() => {
                                handleSocialLogin("naver");
                              }}
                            >
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/img/icon-img/social_n.png"
                                }
                                alt=""
                              />
                            </button>
                            <button
                              className="social-btn social-btn-border bg-white"
                              type="button"
                              onClick={() => {
                                handleSocialLogin("google");
                              }}
                            >
                              <img
                                style={{ marginLeft: "-1px" }}
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/img/icon-img/social_google.png"
                                }
                                alt=""
                              />
                            </button>
                          </div> */}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FindIDModal
          size="md"
          show={findIDModalShow}
          onHide={() => setFindIDModalShow(false)}
          onConfirm={(phoneNum) => {
            setPhoneNumber(phoneNum);
            setFindIDModalShow(false);
            setFindIDResultModalShow(true);
          }}
        />
        <FindIDResultModal
          size="md"
          show={findIDResultModalShow}
          onHide={() => setFindIDResultModalShow(false)}
          phoneNumber={phoneNumber}
          onFindPassword={() => {
            setFindIDResultModalShow(false);
            setFindPasswordModalShow(true);
          }}
          onConfirm={() => {
            setFindIDResultModalShow(false);
          }}
        />
        <FindPasswordModal
          size="md"
          show={findPasswordModalShow}
          onHide={() => setFindPasswordModalShow(false)}
          onConfirm={(phoneNum, emailID) => {
            setPhoneNumber(phoneNum);
            setFindPasswordModalShow(false);
            memberService
              .findPasswordKey({ id: emailID, phone: phoneNum })
              .then((req) => {
                if (req.data.success) {
                  setChangePWKey(req.data.data.change_pw_key);
                  setResetPasswordModalShow(true);
                }
              });
          }}
        />
        <ResetPasswordModal
          size="md"
          show={resetPasswordModalShow}
          changePWKey={changePWKey}
          onHide={() => setResetPasswordModalShow(false)}
          onConfirm={() => {
            setResetPasswordModalShow(false);
            setResetedPasswordModalShow(true);
          }}
          onCancel={() => {
            setResetPasswordModalShow(false);
          }}
        />
        <ResetedPasswordModal
          size="md"
          show={resetedPasswordModalShow}
          onHide={() => setResetedPasswordModalShow(false)}
          onConfirm={() => {
            setResetedPasswordModalShow(false);
          }}
        />
      </Layout>
    </Fragment>
  );
};

export default Login;
