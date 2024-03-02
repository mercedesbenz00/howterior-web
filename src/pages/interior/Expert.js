import { Fragment, useEffect, useState } from "react";
import SEO from "../../components/seo";
import Layout from "../../layouts/Layout";
import { useTranslation } from "react-i18next";

import DesignSelectionStep from "./steps/DesignSelectionStep";
import MaterialGradeStep from "./steps/MaterialGradeStep";
import VerandaExtensionStep from "./steps/VerandaExtensionStep";
import HouseStructureStep from "./steps/HouseStructureStep";

const steps = [1, 2, 3, 4, 5, 6];

const Expert = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  useEffect(() => {}, []);

  const prevStage = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const newxtStage = () => {
    if (step < 6) {
      setStep(step + 1);
    }
  };

  return (
    <Fragment>
      <SEO titleTemplate="Interior" description="Interior of howterior." />
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
                        borderTopRightRadius: item === 6 ? 10 : 0,
                        borderBottomRightRadius: item === 6 ? 10 : 0,
                      }}
                      onClick={() => {
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
              {step === 1 && <DesignSelectionStep />}
              {step === 2 && <MaterialGradeStep />}
              {step === 3 && <VerandaExtensionStep />}
              {step === 4 && <HouseStructureStep />}
            </div>
            <div className="row justify-content-center mt-70">
              <div className="prev_button mr-30" onClick={prevStage}>
                {t("Previous")}
              </div>
              <div className="next_button" onClick={newxtStage}>
                {t("next")}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Expert;
