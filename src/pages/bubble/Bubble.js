import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import SEO from "../../components/seo";
import Layout from "../../layouts/Layout";
import BubbleCautionModal from "../../modal/BubbleCautionModal";
import QuotationRequestModal from "../../modal/QuotationRequestModal";

const Bubble = () => {
  const { t } = useTranslation();
  const [modalShow, setModalShow] = useState(false);
  const [quotationModalShow, setQuotationModalShow] = useState(false);

  useEffect(() => {}, []);

  return (
    <Fragment>
      <SEO titleTemplate="Bubble" description="Bubble of howterior." />
      <Layout headerTop="visible">
        <div className="pt-100 pb-140">
          <div className="container">
            <div className="text-center">
              <h1 className="f-size-64 lh-sm">
                {t("your")}&nbsp;
                <span className="fw-bold">{t("interior")}</span>
                &nbsp;{t("quotation")}
              </h1>
            </div>
            <div className="text-center pb-50">
              <span className="f-size-64 lh-sm">{t("how_are_you_doing")}</span>
            </div>
            <div className="row justify-content-center mb-10 mt-80">
              <div className="col-lg-7">
                <span className="f-size-40 fw-500 color-black4 ls-minus-2 lh-sm">
                  {t("bubble_home_subtitle1")}
                </span>
                <span className="d-inline-block f-size-54 fw-bold color-black2 ls-minus-3 lh-base mt-10">
                  {t("bubble_home_subtitle2")}
                </span>
                <span className="d-inline-block f-size-22 color-black4 ls-minus-1 lh-sm mt-45">
                  {t("bubble_home_p1_content1")}
                  <br />
                  <span className="d-inline-block fw-bold">
                    {t("bubble_home_p1_content2")}
                  </span>
                  {t("bubble_home_p1_content3")}&nbsp;
                  <span className="d-inline-block fw-bold">
                    {t("bubble_home_p1_content4")}
                  </span>
                  {t("bubble_home_p1_content5")}
                  <br />
                  {t("bubble_home_p1_content6")}
                </span>
                <button
                  className="primary-btn-lg mt-100"
                  onClick={() => {
                    setModalShow(true);
                  }}
                >
                  {t("diagnosis_quotation_bubble")}
                </button>
              </div>
              <div className="col-lg-5 pl-60">
                <img
                  className="w-100"
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/img/bubble/bubble-home-1.svg"
                  }
                  alt=""
                />
              </div>
            </div>
            {/* middle text */}
            <div className="row justify-content-center mb-10 mt-210">
              <span className="f-size-64 text-center fw-bold color-black2 ls-minus-3 lh-base">
                {t("howterior")}
              </span>
              <span className="d-inline-block f-size-28 text-center fw-500 color-black4">
                {t("bubble_home_subtitle3")}
              </span>
            </div>
            {/* box */}
            <div className="row bubble-area position-relative justify-content-center mt-35">
              <div className="col-lg-6 offset-lg-3">
                <div className="bubble-welcome-wrapper">
                  <div className="bubble-welcome-content text-center">
                    <span className="f-size-40 text-center white-space-pre fw-500 color-black4 ls-minus-2 lh-base">
                      <span className="color-black2">{t("howterior")}</span>
                      {t("bubble_home_subtitle_welcome")}
                    </span>
                    <div className="mt-60">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/img/bubble/bubble-home-2.svg"
                        }
                        alt=""
                      />
                    </div>
                    <div className="mt-60">
                      <span className="f-size-40 text-center white-space-pre fw-500 color-black2 ls-minus-2 lh-base">
                        {t("bubble_home_subtitle4")}
                        <span className="d-inline-block stroke">
                          {t("bubble_home_subtitle5")}
                        </span>
                      </span>
                    </div>

                    {/* content text */}
                    <div className="mt-60">
                      <span className="d-inline-block white-space-pre f-size-22 color-black4 ls-minus-1 lh-sm">
                        <span className="color-black6">
                          {t("bubble_home_p2_content1")}
                        </span>
                        {t("bubble_home_p2_content2")}
                        <br />
                        <span className="color-black6">
                          {t("bubble_home_p2_content3")}
                        </span>
                        {t("bubble_home_p2_content4")}
                        <br />

                        <span className="d-inline-block mt-4">
                          {t("bubble_home_p2_content5")}
                        </span>
                      </span>
                    </div>
                    {/* button */}
                    <button
                      className="primary-btn-lg mt-60"
                      onClick={() => {
                        setModalShow(true);
                      }}
                    >
                      {t("diagnosis_quotation_bubble")}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>
        </div>

        <BubbleCautionModal
          size="md"
          show={modalShow}
          onHide={() => setModalShow(false)}
          onConfirm={() => {
            setModalShow(false);
            setQuotationModalShow(true);
          }}
        />

        <QuotationRequestModal
          size="md"
          show={quotationModalShow}
          onHide={() => setQuotationModalShow(false)}
        />
      </Layout>
    </Fragment>
  );
};

export default Bubble;
