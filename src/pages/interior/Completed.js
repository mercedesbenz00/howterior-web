import { Fragment, useEffect } from "react";
import SEO from "../../components/seo";
import Layout from "../../layouts/Layout";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Completed = () => {
  useEffect(() => {}, []);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const confirm = () => {
    navigate("/interior");
  };

  return (
    <Fragment>
      <SEO titleTemplate="Interior" description="Interior of howterior." />
      <Layout headerTop="visible">
        <div className="shop-area pt-130 pb-290 bg-gray-3">
          <div className="container">
            <div className="text-center font-24 ht-title mb-55">
              {t("Your request for an estimate has been completed.")}
            </div>
            <div className="text-center">
              <img
                className="icon_84"
                src={
                  process.env.PUBLIC_URL +
                  "/assets/img/interior/tablet_hand.png"
                }
              />
            </div>
            <div className="mt-15 font-18 lh-32 text-gray text-center">
              {t(
                "Based on the information you entered, the experts calculated the estimate."
              )}
            </div>
            <div className="font-18 lh-32 text-gray justify-content-center row-text">
              <div className="fw-bold">
                {t("a maximum of")} 1 {t("day.")}
              </div>
              {t("We will provide it within")}
            </div>
            <div className="mt-30 font-18 lh-32 text-gray text-center">
              {t("Thank you for using Hautaire.")}
            </div>
            <div className="row justify-content-center mt-55">
              <button className="next_button" onClick={confirm}>
                {t("Check")}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Completed;
