import { Fragment, useEffect } from "react";
import SEO from "../../components/seo";
import Layout from "../../layouts/Layout";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUpComplete = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();

  const { joinInfo, joinSuccess } = useSelector((state) => state.join);

  useEffect(() => {
    if (!joinSuccess) {
      navigate("/terms_and_condition");
    }
  }, []);
  const prevStage = () => {
    navigate("/");
  };
  const nextStage = () => {
    navigate("/login");
  };
  return (
    <Fragment>
      <SEO titleTemplate="Interior" description="Interior of howterior." />
      <Layout headerTop="visible">
        <div className="shop-area pt-80 pb-290 bg-white">
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
            <div className="ml-15 mr-15 text-gray">
              {t("Enter information")}
            </div>
            <img
              className="icon_10_21"
              src={process.env.PUBLIC_URL + "/assets/img/join/right.png"}
            />
            <div className="ml-15">{t("Subscription completed")}</div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="col-xl-6 col-sm-8 mt-80 pr-10 pl-10 pb-80">
              <div className="row-text justify-content-center">
                <div className="font-24 fw-bold">{joinInfo?.name}</div>
                <div className="font-18 fw-normal text-gray_2">
                  {t("Congratulations on joining the Howtrier.")}
                </div>
              </div>
              <div className="font-18 fw-normal text-gray_2 lh-32 text-center">
                {t("We'll be back with our reasonable quote service.")}
              </div>
              <div className="font-14 fw-normal text-gray_2 lh-25 text-center  mt-10">
                {t("Try using the service after logging in.")}
              </div>
              <div className="row-text justify-content-center mt-50">
                <button
                  className="white_button mr-30 pr-40 pl-40"
                  onClick={prevStage}
                >
                  {t("As the main dish.")}
                </button>
                <button
                  className="black_button border-0px pr-40 pl-40"
                  onClick={nextStage}
                >
                  {t("Logging in")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default SignUpComplete;
