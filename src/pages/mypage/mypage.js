import { Fragment, useState, useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SEO from "../../components/seo";
import Layout from "../../layouts/Layout";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import Estimate from "./Estimate";
import ChangeInformation from "./ChangeInformation";
import ProggressInterior from "./ProggressInterior";
import QuotationInterior from "./QuotationInterior";
import MaterialList from "./MaterialList";

import {
  getMyBubbleList,
  setButQuoteResult,
} from "../../store/slices/bubble-slice";
import { getMyInteriorList } from "../../store/slices/interior-slice";

const MyPage = () => {
  const scrollRef = useRef();
  const { t } = useTranslation();
  const { profile } = useSelector((state) => state.profile);
  const { bubTotalCount, bubList } = useSelector((state) => state.bubble);
  const { interiorTotalCount, interiorList } = useSelector(
    (state) => state.interior
  );
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [progressNum, setProgressNum] = useState(0);
  const [stage, setStage] = useState(t("Bubble Quotation Request"));
  const dispatch = useDispatch();

  const setEstimateNumFunc = () => {
    setStage(t("Bubble Quotation Request"));
  };
  const setInteriorNumFunc = () => {
    setStage(t("an interior estimate"));
  };
  const setProgressNumFunc = () => {
    setStage(t("an in-process interior design"));
  };
  const changeInformation = () => {
    setStage(t("Modifying information"));
  };

  useEffect(() => {
    setName(profile?.name || "");
    dispatch(getMyBubbleList({ page: 1, page_block: 10 }));
    dispatch(getMyInteriorList({ page: 1, page_block: 10 }));
    setProgressNum(0);
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    function handleScroll() {
      const { scrollTop, scrollHeight, offsetHeight } = element;
      // console.log(scrollTop, scrollHeight, offsetHeight);
      if (scrollTop + offsetHeight >= scrollHeight - 400) {
        console.log("You have reached the end of the page!");
        // Do whatever you want when the user has scrolled to the end
      }
    }
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => {
        if (element) {
          element.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, []);

  return (
    <Fragment>
      <SEO titleTemplate="My Page" description="My page of howterior." />
      <div ref={scrollRef} style={{ height: "100vh", overflowY: "scroll" }}>
        <Layout headerTop="visible">
          <div className="shop-area pt-80 pb-290 bg-gray-3">
            <div className="container column align-items-center">
              <div className="text-center ht-title">
                <h2>{t("My Page")}</h2>
              </div>
              <div
                className="col-lg-8 col-xl-8 col-md-12 row-text pl-30 pr-30 pt-30
            pb-30 bg-white  br-10 mt-55 align-items-center flex-wrap"
              >
                <img
                  src={process.env.PUBLIC_URL + "/assets/img/avatar.png"}
                  className="icon_63_63"
                />
                <div className="ml-15">
                  <div className="font-14 lh-18 text-black_1">
                    {t("Hello!")}
                  </div>
                  <div className="row-text">
                    <div className="font-16 lh-25 fw-500  text-black_1">
                      {name}
                    </div>
                    <div className="font-12 lh-25 fw-500  text-gray_2 ml-5">
                      {t("Sir")}
                    </div>
                  </div>
                </div>
                <button
                  className="border-gray2-1px font-14 lh-25 bg-white text-gray_2 br-6 ml-15 pr-15 pl-15"
                  onClick={changeInformation}
                >
                  {t("Modifying information")}
                </button>
                <div className="bg-gray-4  w-1 h-54 ml-25"></div>
                <div
                  className="flex-1 column align-items-center cursor-pointer"
                  style={{ minWidth: "148px" }}
                  onClick={setEstimateNumFunc}
                >
                  <div className="font-32 fw-500 text-black_1">
                    {bubTotalCount}
                  </div>
                  <div className="font-16 lh-25 fw-500  text-black_1 mt-15">
                    {t("Bubble Quotation Request")}
                  </div>
                </div>
                <div
                  className="flex-1 column align-items-center cursor-pointer"
                  style={{ minWidth: "148px" }}
                  onClick={setInteriorNumFunc}
                >
                  <div className="font-32 fw-500 text-black_1">
                    {interiorTotalCount}
                  </div>
                  <div className="font-16 lh-25 fw-500  text-black_1 mt-15">
                    {t("an interior estimate")}
                  </div>
                </div>
                <div
                  className="flex-1 column align-items-center cursor-pointer"
                  style={{ minWidth: "148px" }}
                  onClick={setProgressNumFunc}
                >
                  <div className="font-32 fw-500 text-black_1">
                    {progressNum}
                  </div>
                  <div className="font-16 lh-25 fw-500  text-black_1 mt-15">
                    {t("an in-process interior design")}
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-xl-8 col-md-12 mt-35 font-16 lh-25 fw-500  text-black_1 ">
                {stage}
              </div>
              <div className="col-lg-8 col-xl-8  h-1 bg-gray mt-5"></div>
              {stage === t("Bubble Quotation Request") && (
                <div className="col-lg-8 col-xl-8">
                  {bubTotalCount === 0 ? (
                    <div className="mt-60 font-14 lh-18 fw-400 text-gray  text-center">
                      {t("There is no estimate requested.")}
                    </div>
                  ) : (
                    <Estimate
                      itemList={bubList}
                      onSelect={(index) => {
                        dispatch(
                          setButQuoteResult({ bub_seq: bubList[index].bub_seq })
                        );
                        navigate("/bubble_check_result");
                      }}
                    />
                  )}
                </div>
              )}
              {stage === t("Material purchase list") && (
                <div className="col-lg-8 col-xl-8">
                  <MaterialList />
                </div>
              )}
              {stage === t("an interior estimate") && (
                <div className="col-lg-8 col-xl-8">
                  {interiorTotalCount === 0 ? (
                    <div className="mt-60 font-14 lh-18 fw-400 text-gray  text-center">
                      {t("There is no estimate requested.")}
                    </div>
                  ) : (
                    <QuotationInterior itemList={interiorList} />
                  )}
                </div>
              )}
              {stage === t("an in-process interior design") && (
                <div className="col-lg-8 col-xl-8">
                  {progressNum === 0 ? (
                    <div className="mt-60 font-14 lh-18 fw-400 text-gray  text-center">
                      {t("There is no estimate requested.")}
                    </div>
                  ) : (
                    <ProggressInterior />
                  )}
                </div>
              )}
              {stage === t("Modifying information") && (
                <div className="col-lg-8 col-xl-8">
                  <ChangeInformation
                    onCancel={() => {
                      setEstimateNumFunc();
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </Layout>
      </div>
    </Fragment>
  );
};

export default MyPage;
