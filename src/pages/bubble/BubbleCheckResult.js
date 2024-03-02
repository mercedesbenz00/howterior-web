import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import SEO from "../../components/seo";
import Layout from "../../layouts/Layout";

import {
  getBubbleQuoteCheckResult,
  saveBubbleChk,
} from "../../store/slices/bubble-slice";
import GaussChart from "../../components/gauss-chart/GaussChart";

const BubbleCheckResult = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bubQuoteResult, bubQuoteCheckEntities } = useSelector(
    (state) => state.bubble
  );
  useEffect(() => {
    if (bubQuoteResult) {
      dispatch(
        getBubbleQuoteCheckResult({
          bub_seq: bubQuoteResult.bub_seq,
        })
      )
        .unwrap()
        .then(() => {})
        .catch(() => {});
    }
  }, [bubQuoteResult]);

  useEffect(() => {
    console.log("bubQuoteCheckEntities", bubQuoteCheckEntities);
  }, [bubQuoteCheckEntities]);

  return (
    <Fragment>
      <SEO
        titleTemplate="Bubble Check Result"
        description="Bubble check result of howterior."
      />
      <Layout headerTop="visible">
        <div className="pt-100 pb-250">
          <div className="container">
            <div className="bubble-result-block text-center">
              <span className="f-size-64 d-inline-block lh-sm">
                {t("bubble_result_text1")}
                <br />
                <span className="fw-bold">Bubble</span>
                &nbsp;{t("bubble_result_text2")}
              </span>
              <div className="mt-25">
                <span className="d-inline-block f-size-22 color-black4 ls-minus-1 lh-sm">
                  {t("bubble_result_text3")}
                </span>
              </div>
            </div>

            {/* middle text */}
            <div className="row justify-content-center mb-10 mt-96">
              <span className="f-size-32 fw-bold text-center white-space-pre color-black2 lh-base">
                {t("bubble_result_text4")}
              </span>
            </div>
            {/* floor box */}
            {/* <div className="bubble-result-block text-center justify-content-center mt-50">
              <span className="f-size-40 d-inline-block fw-500 color-black2 ls-minus-2 lh-base stroke">
                {t("floor")}
              </span>
              <div className="mt-50">
                <span className="d-inline-block f-size-22 color-black4 white-space-pre ls-minus-1 lh-sm">
                  {t("bubble_floor_content")}
                </span>
              </div>
              <button
                className="primary-btn-md btn-border-radius-20 mt-5"
                style={{ minWidth: "275px" }}
                onClick={() => {}}
              >
                <span className="mr-10">{t("to_material_mall")}</span>
                <img
                  style={{ marginTop: "-4px" }}
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/img/icon-img/bubble/arrow_right_btn.svg"
                  }
                  alt=""
                />
              </button>
            </div> */}

            {/* bubble box */}
            {bubQuoteCheckEntities.map((item, itemIndex) => (
              <div
                key={"bubble_result_" + itemIndex}
                className="bubble-result-block d-flex flex-column align-items-center justify-content-center mt-24"
              >
                <span className="f-size-40 d-inline-block fw-500 color-black2 ls-minus-2 lh-base stroke">
                  {item.process_info_name}
                </span>
                <div className="mt-50 bubble-level-container">
                  <span className="f-size-32 fw-bold color-black2 lh-base">
                    Bubble {item.p_grade}
                  </span>
                </div>
                <div className="mt-48">
                  <span className="d-inline-block f-size-20 color-black6 white-space-pre lh-base">
                    {t("bubble_result_text5")}&nbsp;
                    <span className="f-size-24 fw-bold">
                      {t("approximately")} {item.p_range}%
                    </span>
                    &nbsp;
                    {t("bubble_result_text6")}
                  </span>
                </div>
                <div className="p-5">
                  <span className="d-inline-block f-size-22 color-black4 white-space-pre ls-minus-1 lh-sm">
                    {item.content}
                  </span>
                </div>
                <div className="mt-3">
                  <GaussChart score={item.p_range} />
                </div>
                <button
                  className="primary-btn-md btn-border-radius-20 mt-50"
                  style={{ minWidth: "275px" }}
                  onClick={() => {
                    dispatch(saveBubbleChk(item.bub_seq))
                      .unwrap()
                      .then(() => {
                        navigate("/");
                      })
                      .catch(() => {});
                  }}
                >
                  <span className="mr-10">{t("save_result")}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default BubbleCheckResult;
