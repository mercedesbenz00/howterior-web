import { Fragment, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

import {
  initializeInteriorRequest,
  getInteriorDetail,
  saveInteriorReqeust,
  updateInteriorReqeust,
} from "../../store/slices/interior-slice";
import { resetCart } from "../../store/slices/product-slice";
import MaterialGradeStep from "./steps/MaterialGradeStep";
import HouseStructureStep from "./steps/HouseStructureStep";
import InteriorProcessStep from "./steps/InteriorProcessStep";
import FinalCheckStep from "./steps/FinalCheckStep";
import DateSelectionStep from "./steps/DateSelectionStep";
import SEO from "../../components/seo";
import Layout from "../../layouts/Layout";

const steps = [1, 2, 3, 4, 5];

const UserInterior = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useLocation().search;
  const { interiorRequest } = useSelector((state) => state.interior);
  const { cartInfoList } = useSelector((state) => state.product);
  const [step, setStep] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const nextBtnRef = useRef(null);

  useEffect(() => {
    const seq = new URLSearchParams(search).get("seq");
    dispatch(resetCart());
    dispatch(initializeInteriorRequest());
    if (seq !== undefined && seq !== null) {
      dispatch(getInteriorDetail({ est_seq: seq }));
      if (step < 3) {
        setStep(3);
      }
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, []);

  const prevStage = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const nextStage = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const buildEstProcessEntities = () => {
    let estProcessEntities = [];
    // depth 1 - process
    cartInfoList.forEach((cartInfo) => {
      let processEntity = estProcessEntities.find(
        (entity) => entity.process_seq === cartInfo.process_seq
      );
      if (!processEntity) {
        processEntity = {
          process_seq: cartInfo.process_seq,
          estProcessAreaEntities: [],
        };
        estProcessEntities.push(processEntity);
      }

      //depth 2 - area
      cartInfo.areaList.forEach((areaInfo) => {
        let areaEntity = processEntity.estProcessAreaEntities.find(
          (entity) => entity.area_seq === areaInfo.area_seq
        );
        if (!areaEntity) {
          areaEntity = {
            area_seq: areaInfo.area_seq,
            estProcessProductEntities: [],
          };
          processEntity.estProcessAreaEntities.push(areaEntity);
        }

        //depth 3 - product
        areaEntity.estProcessProductEntities.push({
          product_seq: areaInfo.product?.product_seq,
          estProcessProductCatEntities:
            areaInfo.product?.estProcessProductCatEntities || [],
        });
      });
    });

    // console.log("estProcessEntities", estProcessEntities);
    return estProcessEntities;
  };

  const submitInteriorRequest = () => {
    let estProcessEntities = buildEstProcessEntities();

    let finalInteriorRequest = JSON.parse(JSON.stringify(interiorRequest));
    finalInteriorRequest.estProcessEntities = estProcessEntities;
    finalInteriorRequest.apt_name = "청구아파트";
    if (step === 5) {
      finalInteriorRequest.temp_yn = "N";
      delete finalInteriorRequest.depth;
    } else {
      finalInteriorRequest.temp_yn = "Y";
      if (step < 3) {
        finalInteriorRequest.depth = 1;
      } else if (step == 3) {
        finalInteriorRequest.depth = 2;
      } else {
        finalInteriorRequest.depth = 3;
      }
    }
    // console.log("finalInteriorRequest", finalInteriorRequest);
    if (editMode) {
      delete finalInteriorRequest.memberEntity;
      delete finalInteriorRequest.process_name;
      delete finalInteriorRequest.ext_amount;
      delete finalInteriorRequest.ext_process_amount;
      delete finalInteriorRequest.ext_product_amount;
      delete finalInteriorRequest.confirm1_yn;
      delete finalInteriorRequest.confirm2_yn;
      delete finalInteriorRequest.mk_dt_yyyymmdd;
      delete finalInteriorRequest.est_status;
      delete finalInteriorRequest.est_status_info_code;
      delete finalInteriorRequest.est_status_up_code;
      delete finalInteriorRequest.member_seq;
      delete finalInteriorRequest.create_dt_yyyymmdd;

      finalInteriorRequest.estAreaEntities =
        finalInteriorRequest.estAreaEntities?.map((obj) => {
          return { area_seq: obj.area_seq, p_count: obj.p_count };
        });

      const updateData = {};
      updateData.est_seq = finalInteriorRequest.est_seq;
      updateData.type = finalInteriorRequest.type;
      updateData.grade = finalInteriorRequest.grade;
      updateData.area_size = String(finalInteriorRequest.area_size);
      updateData.apt_name = finalInteriorRequest.apt_name;
      updateData.balcony_yns = finalInteriorRequest.balcony_yns;
      updateData.mk_dt = finalInteriorRequest.mk_dt;
      updateData.memo = finalInteriorRequest.memo;
      updateData.estAreaEntities = finalInteriorRequest.estAreaEntities;
      updateData.estProcessEntities = finalInteriorRequest.estProcessEntities;

      dispatch(updateInteriorReqeust(updateData))
        .unwrap()
        .then(() => {
          navigate("/completed");
        })
        .catch(() => {});
    } else {
      dispatch(saveInteriorReqeust(finalInteriorRequest))
        .unwrap()
        .then(() => {
          navigate("/completed");
        })
        .catch(() => {});
    }
  };

  const hasAreaCountInformation = () => {
    if (interiorRequest.estAreaEntities.length === 0) {
      return false;
    }

    return true;
  };

  const hasAreaSizeInformation = () => {
    if (!interiorRequest.area_size || Number(interiorRequest.area_size) === 0) {
      return false;
    }

    return true;
  };

  const availableToGo = () => {
    if (step === 3) {
      if (cartInfoList.length === 0) {
        return false;
      }
    }
    return true;
  };

  const getTooltipText = () => {
    let items = [];
    if (!hasAreaSizeInformation()) {
      items.push("평수");
    }
    if (!hasAreaCountInformation()) {
      items.push("방개수");
    }
    return items.join(", ") + "를 입력하세요";
  };
  return (
    <Fragment>
      <SEO
        titleTemplate="User Interior"
        description="User Interior of howterior."
      />
      <Layout headerTop="visible">
        <div className="shop-area pt-80 pb-290 bg-gray-3">
          <div className="container">
            <div className="text-center ht-title mb-40">
              <h2>{t("interior_decoration")}</h2>
            </div>
            <div className="expert text-center">
              <div className="row justify-content-center step_tab_container mb-70">
                {steps.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="col-xl-1 col-sm-1 step_tab_button"
                      style={{
                        backgroundColor: step === item ? "black" : "white",
                        borderTopLeftRadius: item === 1 ? 10 : 0,
                        borderBottomLeftRadius: item === 1 ? 10 : 0,
                        borderTopRightRadius: item === 5 ? 10 : 0,
                        borderBottomRightRadius: item === 5 ? 10 : 0,
                      }}
                      onClick={() => {
                        if (
                          availableToGo() &&
                          hasAreaCountInformation() &&
                          hasAreaSizeInformation()
                        )
                          setStep(item);
                      }}
                    >
                      <h6 style={{ color: step === item ? "white" : "black" }}>
                        STEP {item}
                      </h6>
                    </div>
                  );
                })}
              </div>
              {step === 1 && <MaterialGradeStep />}
              {step === 2 && <HouseStructureStep />}
              {step === 3 && (
                <InteriorProcessStep
                  goToStep={(stepNum) => {
                    setStep(stepNum);
                  }}
                />
              )}
              {step === 4 && <FinalCheckStep />}
              {step === 5 && <DateSelectionStep />}
            </div>
            <div className="row justify-content-center mt-70">
              <button className="prev_button mr-30" onClick={prevStage}>
                {t("Previous")}
              </button>
              {step > 4 && (
                <button
                  className="next_button mr-30"
                  onClick={submitInteriorRequest}
                >
                  {t("Request for quotation")}
                </button>
              )}
              {step < 5 && (
                <>
                  <button
                    ref={nextBtnRef}
                    className="next_button"
                    disabled={!availableToGo()}
                    onClick={() => {
                      if (step === 2 && !hasAreaSizeInformation()) {
                        setTooltipText(getTooltipText());
                        setShowTooltip(true);
                      } else if (step === 2 && !hasAreaCountInformation()) {
                        setTooltipText(getTooltipText());
                        setShowTooltip(true);
                      } else {
                        nextStage();
                      }
                    }}
                  >
                    {t("next")}
                  </button>

                  <Overlay
                    show={showTooltip}
                    onHide={() => {
                      setShowTooltip(false);
                    }}
                    target={nextBtnRef.current}
                    placement="top"
                    rootClose
                    containerPadding={20}
                  >
                    <Popover id="popover-contained">
                      <Popover.Body>{tooltipText}</Popover.Body>
                    </Popover>
                  </Overlay>
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default UserInterior;
