import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  getAreaList,
  localSaveInteriorReqeust,
} from "../../../store/slices/interior-slice";

const HouseStructureStep = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { interiorAreaList, interiorRequest } = useSelector(
    (state) => state.interior
  );
  const [estAreaEntities, setEstAreaEntities] = useState(
    JSON.parse(JSON.stringify(interiorRequest.estAreaEntities))
  );
  const [pyeong, setPyeong] = useState(interiorRequest.area_size || "0");

  useEffect(() => {
    if (interiorAreaList.length === 0) {
      dispatch(getAreaList("L"))
        .unwrap()
        .then(() => {})
        .catch(() => {});
    }
  }, []);

  const handleChangePyeong = (event) => {
    setPyeong(event.target.value);
    dispatch(
      localSaveInteriorReqeust({
        ...interiorRequest,
        area_size: event.target.value,
      })
    );
  };

  const getAreaSeqCount = (areqSeq) => {
    const areaInfo =
      estAreaEntities &&
      estAreaEntities.find((entity) => entity.area_seq === areqSeq);
    return areaInfo ? areaInfo.p_count : 0;
  };

  const handleStructureNumAdd = (item, max_count) => {
    const areaInfo = estAreaEntities.find(
      (entity) => entity.area_seq === item.area_seq
    );
    if (areaInfo) {
      if ((areaInfo.p_count || 0) < max_count) {
        areaInfo.p_count = areaInfo.p_count ? areaInfo.p_count + 1 : 1;
        setEstAreaEntities(JSON.parse(JSON.stringify(estAreaEntities)));
      }
    } else {
      estAreaEntities.push({ p_count: 1, area_seq: item.area_seq });
      setEstAreaEntities(JSON.parse(JSON.stringify(estAreaEntities)));
    }
    dispatch(
      localSaveInteriorReqeust({
        ...interiorRequest,
        estAreaEntities: JSON.parse(JSON.stringify(estAreaEntities)),
      })
    );
  };

  const handleStructureNumMinus = (item) => {
    const areaInfo = estAreaEntities.find(
      (entity) => entity.area_seq === item.area_seq
    );
    if (areaInfo) {
      if ((areaInfo.p_count || 0) > 0) {
        areaInfo.p_count = areaInfo.p_count - 1;
        let newEntities = JSON.parse(JSON.stringify(estAreaEntities));
        if (areaInfo.p_count === 0) {
          let areaIndex = newEntities.findIndex(
            (entity) => entity.area_seq === areaInfo.area_seq
          );
          newEntities.splice(areaIndex, 1);
        }
        setEstAreaEntities(newEntities);
        dispatch(
          localSaveInteriorReqeust({
            ...interiorRequest,
            estAreaEntities: JSON.parse(JSON.stringify(newEntities)),
          })
        );
      }
    }
  };

  return (
    <div className="column  align-items-center">
      <h5 className="text-gray">
        {t("We need your house structure to proceed with the entire interior.")}
      </h5>
      <h5 className="text-gray">{t("Please enter your house structure!")}</h5>
      <div className="structure_content col-xl-6 col-sm-12 column mt-40 justify-content-center column align-items-center pt-30">
        <div className="row-text">
          <div className="font-16 lh-32 fw-500 text-black_1">
            {t("My house is")}{" "}
          </div>
          <div className="ml-30 mr-10">
            <input
              className="pyeong_input"
              type="number"
              value={pyeong}
              onChange={handleChangePyeong}
            />
          </div>
          <div className="font-16 lh-32 fw-500 text-black_1">
            {t("pyeong.")}
          </div>
        </div>
        <div className="mt-10" />
        {interiorAreaList.map((item, index) => {
          return (
            <div
              key={index}
              className="structure_item mt-25 align-items-center"
            >
              <div className="w-55">
                <img style={{ height: item.height }} src={item.img_url} />
              </div>
              <div className="w-90 ml-20">{item.area_name}</div>
              <div className="structure_item_button text-black align-items-center pr-15 pl-15">
                <div
                  className="h-20 w-20 d-flex align-items-center"
                  onClick={() => {
                    handleStructureNumMinus(item);
                  }}
                >
                  <img
                    className="icon_11"
                    src={
                      process.env.PUBLIC_URL + "/assets/img/interior/minus.png"
                    }
                  />
                </div>
                <div className="flex-1">{getAreaSeqCount(item.area_seq)}</div>
                <div
                  className="h-20 w-20 d-flex align-items-center"
                  onClick={() => {
                    handleStructureNumAdd(item, item.max_cnt);
                  }}
                >
                  <img
                    className="icon_11"
                    src={
                      process.env.PUBLIC_URL + "/assets/img/interior/plus.png"
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HouseStructureStep;
