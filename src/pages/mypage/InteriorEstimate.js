import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";

import { getInteriorDetail } from "../../store/slices/interior-slice";

import SEO from "../../components/seo";
import Layout from "../../layouts/Layout";
import Table from "react-bootstrap/Table";

// const data0 = [
//   {
//     process: "도배",
//     inscription: "자재비 외",
//     space: "방1, 주방 외1",
//     materials_cost: "1,150,000",
//     construction_cost: "1,000,000",
//     amount: "2,150,000",
//     visble: false,
//     detail: {
//       list: [
//         {
//           inscription: "자재비",
//           space: "방1",
//           classification: "실크",
//           image: "/assets/img/materials/material1.png",
//           model_num: "93232-1",
//           model_name: "개나리외 1개",
//           color: "노랑",
//           standard: "200*300",
//           unit: "평",
//           quantity: 90,
//           price: "10,000",
//           amount: "900,000",
//         },
//         {
//           inscription: "자재비",
//           space: "방1",
//           classification: "실크",
//           image: "/assets/img/materials/material1.png",
//           model_num: "93232-1",
//           model_name: "개나리외 1개",
//           color: "노랑",
//           standard: "200*300",
//           unit: "평",
//           quantity: 90,
//           price: "10,000",
//           amount: "900,000",
//         },
//       ],
//       materials_cost: "1,150,000",
//       construction: "1,150,000",
//       construction_cost: "1,150,000",
//       sum: "1,150,000",
//     },
//   },
//   {
//     process: "도배",
//     inscription: "자재비 외",
//     space: "방1, 주방 외1",
//     materials_cost: "1,150,000",
//     construction_cost: "1,000,000",
//     amount: "2,150,000",
//     visble: false,
//     detail: null,
//   },
//   {
//     process: "도배",
//     inscription: "자재비 외",
//     space: "방1, 주방 외1",
//     materials_cost: "1,150,000",
//     construction_cost: "1,000,000",
//     amount: "2,150,000",
//     visble: false,
//     detail: null,
//   },
// ];

const info = { inscription: "자재비" };

const InteriorEstimate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { interiorRequest } = useSelector((state) => state.interior);
  const [expandMap, setExpandMap] = useState({});

  const { seq } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInteriorDetail({ est_seq: seq }));
  }, [seq]);

  const getDesiredDate = (strDate) => {
    // returns 2022 12 15 () format
    let ret = "";
    let days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    if (strDate) {
      const dateObj = moment(String(strDate), "YYYY-MM-DD").toDate();

      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      ret = `${year} ${month}월 ${day}일 (${t(days[dateObj.getDay()])})`;
    }
    return ret;
  };

  const getHumanReadableNumber = (value) => {
    let ret = 0;
    if (value) {
      ret = value.toLocaleString("en-US") || 0;
    }

    return ret;
  };

  return (
    <Fragment>
      <SEO titleTemplate="Interior" description="Interior of howterior." />
      <Layout headerTop="visible">
        <div className="shop-area pt-80 bg-white">
          <div className="column align-items-center">
            <div className="font-32 fw-bold text-black_1">
              {t("interior_decoration")}
            </div>
            <div className="mt-40 row-text font-18 lh-32 justify-content-center">
              <div className="text-yellow">
                {interiorRequest?.memberEntity?.name}
              </div>
              <div className="text-gray">
                {t("This is your home terrier quote.")}
              </div>
            </div>
            <div className="mt-50 col-xl-8 br-20 border-gray4-1px pt-25 pb-40 pr-40 pl-40">
              <div className="font-18 fw-500 ">{t("Order information")}</div>
              <div className="line bg-gray mt-5"></div>
              <div className="row-text pr-40 pl-40 pt-25 pb-25 font-14 lh-25 wf-400 text-gray">
                <div className="flex-1">
                  <div className="row-text">
                    <div className="flex-1">{t("Order number")}</div>
                    <div className="flex-2">{interiorRequest?.est_seq}</div>
                  </div>
                  <div className="row-text mt-20">
                    <div className="flex-1">{t("Order name")}</div>
                    <div className="flex-2"></div>
                  </div>
                </div>
                <div className="w-1 bg-gray" />
                <div className="flex-1 pl-60">
                  <div className="row-text">
                    <div className="flex-1">
                      {t("Desired construction date of construction")}
                    </div>
                    <div className="flex-2">
                      {getDesiredDate(interiorRequest?.mk_dt_yyyymmdd)}
                    </div>
                  </div>
                  <div className="row-text mt-20">
                    <div className="flex-1">{t("Order information")}</div>
                    <div className="flex-2">
                      {interiorRequest?.process_name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="line bg-gray mt-5"></div>
              <div className="font-18 fw-500 mt-25">{t("Order amount_1")}</div>
              <div className="line bg-gray mt-5"></div>
              <div className="row-text pr-40 pl-40 pt-25 pb-25 font-14 lh-25 wf-400 text-gray">
                <div className="flex-1">
                  <div className="row-text">
                    <div className="flex-1">{t("Total material amount")}</div>
                    <div className="flex-1">
                      {interiorRequest?.ext_product_amount?.toLocaleString(
                        "en-US"
                      ) || 0}
                      {t("yuan")}
                    </div>
                  </div>
                  <div className="row-text mt-20">
                    <div className="flex-1">
                      {t("Total construction amount")}
                    </div>
                    <div className="flex-1">
                      {interiorRequest?.ext_process_amount?.toLocaleString(
                        "en-US"
                      ) || 0}
                      {t("yuan")}
                    </div>
                  </div>
                </div>
                <div className="w-1 bg-gray" />
                <div className="flex-1 pl-60">
                  <div className="row-text mt-20">
                    <div className="flex-1">{t("Total order amount")}</div>
                    <div className="flex-1 text-black_1 fw-600">
                      {interiorRequest?.ext_amount?.toLocaleString("en-US") ||
                        0}
                      {t("yuan")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="line bg-gray mt-5"></div>
              <div className="font-18 fw-500 mt-25">
                {t("Estimate details")}
              </div>
              <div className="line bg-gray mt-5"></div>
              <div className="row-text text-center font-12 lh-45 fw-400 text-gray bg-gray-1">
                <div className="flex-1">{t("process")}</div>
                <div className="flex-1">{t("an inscription")}</div>
                <div className="flex-1">{t("Full interior space")}</div>
                <div className="flex-1">{t("Total cost of materials")}</div>
                <div className="flex-1">{t("Total construction costs")}</div>
                <div className="flex-1">{t("Amount")}</div>
              </div>
              {interiorRequest?.estProcessEntities?.map((item, index) => {
                let imgSrc = "";
                if (expandMap[String(item.est_process_seq)]) {
                  imgSrc =
                    process.env.PUBLIC_URL + "/assets/img/interior/top.png";
                } else {
                  imgSrc =
                    process.env.PUBLIC_URL + "/assets/img/interior/bottom.png";
                }
                return (
                  <div key={index}>
                    <div className="row-text text-center font-12 lh-75 fw-400 text-gray">
                      <div className="flex-1">{item.process_name}</div>
                      <div className="flex-1 column align-items-center">
                        <div className="row-text align-items-center">
                          <div className="mr-10">{info.inscription}</div>
                          <img
                            onClick={() => {
                              let mapKey = String(item.est_process_seq);
                              let isVisible = expandMap[mapKey] || false;
                              isVisible = !isVisible;
                              setExpandMap({
                                ...expandMap,
                                [mapKey]: isVisible,
                              });
                            }}
                            className="icon_11 cursor-pointer"
                            src={imgSrc}
                          />
                        </div>
                      </div>
                      <div className="flex-1">{}</div>
                      <div className="flex-1">
                        {getHumanReadableNumber(item.fb_product_amount)}
                      </div>
                      <div className="flex-1">
                        {getHumanReadableNumber(item.fb_process_amount)}
                      </div>
                      <div className="flex-1">
                        {getHumanReadableNumber(
                          item.fb_product_amount + item.fb_process_amount
                        )}
                      </div>
                    </div>
                    <div className="line bg-gray"></div>
                    {item.estProcessAreaEntities !== null &&
                      expandMap[String(item.est_process_seq)] && (
                        <Table>
                          <thead>
                            <tr className="text-center font-12 lh-45 fw-400 text-gray bg-gray">
                              <th>{t("an inscription")}</th>
                              <th>{t("Space")}</th>
                              <th>{t("Classification")}</th>
                              <th>
                                {t("Model name")}({t("Image")})
                              </th>
                              <th>{t("Color")}</th>
                              <th>{t("standard")}</th>
                              <th>{t("Unit")}</th>
                              <th>{t("Quantity")}</th>
                              <th>{t("Unit price")}</th>
                              <th>{t("Amount")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.estProcessAreaEntities?.map(
                              (item0, index0) => {
                                return item0.estProcessProductEntities?.map(
                                  (item1, index1) => {
                                    return (
                                      <tr
                                        key={index0 + "-" + index1}
                                        className="text-center font-12 lh-65 fw-400 text-gray bg-gray-1 "
                                      >
                                        <td>{item0.inscription}</td>
                                        <td>{item0.area_name}</td>
                                        <td>{item1?.category_name}</td>
                                        <td>
                                          <div className="row-text align-items-center">
                                            <div>
                                              <img
                                                src={
                                                  item1?.file_url
                                                    ? process.env.PUBLIC_URL +
                                                      item1?.file_url
                                                    : ""
                                                }
                                                className="icon_28"
                                              />
                                            </div>
                                            <div className="column lh-16 ml-10 text-align-initial">
                                              <div>{item1?.product_code}</div>
                                              <div>{item1?.product_name}</div>
                                            </div>
                                          </div>
                                        </td>
                                        <td>{item1?.color_name}</td>
                                        <td>{item1?.size_name}</td>
                                        <td>{}</td>
                                        <td>{item1?.p_count}</td>
                                        <td>
                                          {getHumanReadableNumber(
                                            item1?.amount
                                          )}
                                        </td>
                                        <td>
                                          {getHumanReadableNumber(
                                            item1?.tot_amount
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  }
                                );
                              }
                            )}
                            <tr className="text-center font-12 lh-45 fw-400 text-gray bg-gray-1 ">
                              <td>
                                <div className="column">
                                  <div>{t("Material subtotal")}</div>
                                  <div>{t("construction cost")}</div>
                                  <div>{t("Construction work system")}</div>
                                </div>
                              </td>
                              <td>
                                <div className="column">
                                  <div>&nbsp;</div>
                                  <div>전체</div>
                                  <div>&nbsp;</div>
                                </div>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>
                                <div className="column">
                                  <div>
                                    {getHumanReadableNumber(
                                      item.fb_product_amount
                                    )}
                                  </div>
                                  <div>
                                    {getHumanReadableNumber(
                                      item.fb_labor_amount
                                    )}
                                  </div>
                                  <div>
                                    {getHumanReadableNumber(
                                      item.fb_process_amount
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr className="text-center font-12 lh-65 fw-bold text-gray bg-gray-1 ">
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>
                                {getHumanReadableNumber(
                                  item.fb_product_amount +
                                    item.fb_labor_amount +
                                    item.fb_process_amount
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      )}
                  </div>
                );
              })}
              <div className="row-text text-center font-12 lh-75 fw-bold text-black_1">
                <div className="flex-1"></div>
                <div className="flex-1"></div>
                <div className="flex-1"></div>
                <div className="flex-1">
                  {getHumanReadableNumber(interiorRequest?.ext_product_amount)}
                </div>
                <div className="flex-1">
                  {getHumanReadableNumber(interiorRequest?.ext_process_amount)}
                </div>
                <div className="flex-1">
                  {getHumanReadableNumber(interiorRequest?.ext_amount)}
                </div>
              </div>
              <div className="line bg-gray"></div>
            </div>
          </div>
        </div>
        <div className="mt-45 row-text font-14 lh-25 fw-400 justify-content-center  mb-60">
          <button
            className="text-black_1 pt-10 pb-10 pr-40 pl-40 br-10 border-gray2-1px bg-white"
            onClick={() => {
              navigate(`/user_interior?seq=${interiorRequest?.est_seq}`);
            }}
          >
            {t("Quotation correction")}
          </button>
          <button
            className="ml-5 text-white  pt-10 pb-10 pr-40 pl-40 br-10 bg-black border-0px"
            onClick={() => {
              navigate(-1);
            }}
          >
            {t("confirm")}
          </button>
        </div>
      </Layout>
    </Fragment>
  );
};

export default InteriorEstimate;
