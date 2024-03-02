import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";

import SelectMaterialModal from "../../../modal/SelectMaterialModal";
import Checkbox from "../../../components/checkbox/Checkbox";
import {
  getProcessList,
  getProcessAreaJoinList,
  initializeProcessAreaJoinList,
} from "../../../store/slices/interior-slice";
import {
  setShowAlert,
  setErrorMessage,
} from "../../../store/slices/message-slice";
import {
  addToCart,
  updateToCart,
  deleteFromCart,
} from "../../../store/slices/product-slice";

const InteriorProcessStep = ({ goToStep }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    interiorProcessList,
    processAreaJoinList,
    interiorAreaList,
    interiorRequest,
  } = useSelector((state) => state.interior);
  const { cartInfoList } = useSelector((state) => state.product);
  const [selectAllAreas, setSelectAllAreas] = useState(false);
  const [selectedAreqSeqs, setSelectedAreaSeqs] = useState([]);

  const [selectedCartItem, setSelectedCartItem] = useState(null);

  useEffect(() => {
    if (interiorProcessList.length === 0) {
      dispatch(getProcessList())
        .unwrap()
        .then(() => {})
        .catch(() => {});
    }

    dispatch(initializeProcessAreaJoinList());
  }, []);

  useEffect(() => {
    if (selectAllAreas) {
      let newAreaSeqs = [];
      for (const areaJoinItem of processAreaJoinList) {
        newAreaSeqs.push(areaJoinItem.area_seq);
      }
      setSelectedAreaSeqs(newAreaSeqs);
    }
  }, [selectAllAreas]);

  const [selectMaterialShow, setSelectMaterialShow] = useState(false);
  const [interiorProcessShow, setInteriorProcessShow] = useState(true);

  const [selectedProcessSeq, setSelectedProcessSeq] = useState(-1);

  const handleInteriorProcessShow = () => {
    setInteriorProcessShow(!interiorProcessShow);
  };
  const handleProcessItemClick = (processSeq) => {
    setSelectedProcessSeq(processSeq);
    setSelectedAreaSeqs([]);
    setSelectedCartItem(null);
    dispatch(initializeProcessAreaJoinList());
    dispatch(
      getProcessAreaJoinList({
        process_seq: processSeq,
        estAreaEntities: interiorRequest.estAreaEntities,
      })
    );
  };

  const checkBasketValidation = () => {
    let roomSeq =
      interiorAreaList.find((item) => item.sort === 1)?.area_seq || null;
    if (roomSeq) {
      let roomInfo = interiorRequest.estAreaEntities.find(
        (areaEntity) => areaEntity.area_seq === roomSeq
      );
      if (roomInfo) {
        const roomCount = roomInfo.p_count;

        const cartRoomNames = cartInfoList?.reduce((accumulator, curItem) => {
          if (curItem.process_name === "도배") {
            const areaList = curItem.areaList;
            for (const areaItem of areaList) {
              if (areaItem.area_name && areaItem.area_name.startsWith("방")) {
                if (!accumulator.includes(areaItem.area_name)) {
                  accumulator.push(areaItem.area_name);
                }
              }
            }
          }
          return accumulator;
        }, []);

        return {
          valid: cartRoomNames.length === roomCount,
          roomCount,
          selectedRoomNames: cartRoomNames,
        };
      }
    }

    return { valid: true };
  };

  const onSelectProduct = (
    processSeq,
    areaSeqList,
    product,
    optionValueMap
  ) => {
    let currentCartItem = selectedCartItem
      ? JSON.parse(JSON.stringify(selectedCartItem))
      : null;
    // Fill current cart with selected areas and product.
    if (currentCartItem === null) {
      const processItem = interiorProcessList.find(
        (process) => process.process_seq === processSeq
      );
      if (processItem) {
        currentCartItem = {
          process_seq: processItem.process_seq,
          process_name: processItem.process_name,
        };
      }
    }

    if (currentCartItem && areaSeqList.length) {
      if (!currentCartItem.areaList) {
        currentCartItem.areaList = [];
      }
      areaSeqList.forEach((areaSeq) => {
        let areaItem = processAreaJoinList.find(
          (processArea) => processArea.area_seq === areaSeq
        );
        if (areaItem) {
          let areaInfo = {
            area_seq: areaItem.area_seq,
            area_name: areaItem.area_name,
            img_url: areaItem.img_url,
            product: {
              product_seq: product.product_seq,
              product_code: product.product_code,
              product_name: product.product_name,
              file_url: product.file_url,
              estProcessProductCatEntities: [],
            },
          };
          for (const strCatSeq of Object.keys(optionValueMap)) {
            areaInfo.product.estProcessProductCatEntities.push({
              cat_seq: Number(strCatSeq),
              cat_val_seq: optionValueMap[strCatSeq],
            });
          }

          const areaListIndex = currentCartItem.areaList.findIndex(
            (areaItem) => areaItem.area_seq === areaInfo.area_seq
          );
          if (areaListIndex > -1) {
            currentCartItem.areaList[areaListIndex] = areaInfo;
          } else {
            currentCartItem.areaList.push(areaInfo);
          }
          setSelectedCartItem(currentCartItem);
        }
      });
      // console.log("cartItem", currentCartItem);
    }
  };

  const onAddToCart = () => {
    if (selectedCartItem.cartSeq) {
      dispatch(updateToCart(selectedCartItem));
    } else {
      dispatch(addToCart(selectedCartItem));
    }
    setSelectedCartItem(null);
    setSelectedAreaSeqs([]);
  };

  const onSelectCartItem = (cartItem) => {
    handleProcessItemClick(cartItem.process_seq);
    setSelectedCartItem(cartItem);
    setSelectedAreaSeqs([]);
  };

  const getCartItemName = (cartItem) => {
    let areaNames = cartItem.areaList
      ? cartItem.areaList.map((areaItem) => areaItem.area_name)
      : [];
    return `${cartItem.process_name}(${areaNames.join(",")})`;
  };

  return (
    <div className="column  align-items-center">
      <h5 className="text-gray">
        {t("Choose the details to proceed with the interior design.")}
      </h5>
      <div className="row mt-40 w-100 justify-content-center">
        <div className="column col-xl-6 col-md-12">
          <div className="process_content column  justify-content-center column align-items-center">
            <div
              className="process_select_content d-flex row"
              onClick={() => {
                handleInteriorProcessShow();
              }}
            >
              <div className="flex-1">
                <h5 className="fw-bold">① {t("Select interior process")}</h5>
              </div>
              <div className="icon_17_8">
                {interiorProcessShow ? (
                  <img
                    className="icon_17_8"
                    src={
                      process.env.PUBLIC_URL + "/assets/img/interior/top.png"
                    }
                  />
                ) : (
                  <img
                    className="icon_17_8"
                    src={
                      process.env.PUBLIC_URL + "/assets/img/interior/bottom.png"
                    }
                  />
                )}
              </div>
            </div>
            {interiorProcessShow && (
              <div className="process_select_list mt-20 pt-10">
                <div className="row">
                  {interiorProcessList.map((item, index) => {
                    return (
                      <div key={index} className="col-4 mt-15">
                        <div
                          key={index}
                          onClick={() => {
                            handleProcessItemClick(item.process_seq);
                          }}
                          className="process_select_item h-49"
                          style={{
                            backgroundColor:
                              item.process_seq === selectedProcessSeq
                                ? "#627084"
                                : "#FFFFFF",
                            color:
                              item.process_seq === selectedProcessSeq
                                ? "#FFFFFF"
                                : "#1D1C2B",
                          }}
                        >
                          {item.process_name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="cart_content column mt-30 justify-content-center column align-items-center">
            <div className="process_select_content d-flex row">
              <h5 className="fw-bold">{t("an interior basket")}</h5>
            </div>
            <div className="process_select_content mt-20">
              <div className="d-flex flex-wrap" style={{ gap: "14px" }}>
                {cartInfoList.map((_, index) => {
                  return (
                    <div
                      className="basket_item row-text cursor-pointer"
                      key={index}
                      onClick={() => {
                        onSelectCartItem(cartInfoList[index]);
                      }}
                    >
                      <div>{getCartItemName(cartInfoList[index])}</div>
                      <img
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          dispatch(deleteFromCart(cartInfoList[index].cartSeq));
                          setSelectedCartItem(null);
                        }}
                        className="icon_15 cursor-pointer ml-10"
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/img/interior/close.png"
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="column col-xl-6 col-md-12">
          <div className="process_content column justify-content-center column align-items-center pr-30 pl-30">
            <div className="w-100 d-flex row-text align-items-center">
              <Table responsive borderless>
                <thead>
                  <tr className="align-middle">
                    <th className="text-start">
                      <Checkbox
                        size="md"
                        round={true}
                        lightMode
                        checked={selectAllAreas}
                        onChange={() => {
                          if (selectAllAreas) {
                            setSelectedAreaSeqs([]);
                          }
                          setSelectAllAreas(!selectAllAreas);
                        }}
                      />
                    </th>
                    <th style={{ minWidth: "90px" }}>
                      <div className="font-18 fw-bold">{t("Select All")}</div>
                    </th>
                    <th style={{ minWidth: "200px" }}>
                      <div className="flex-1  d-flex justify-content-center">
                        <button
                          className="material_select_button fw-normal font-18 pr-20 pl-20 d-flex align-items-center text-black_2"
                          disabled={selectedAreqSeqs.length === 0}
                          onClick={() => {
                            setSelectMaterialShow(true);
                          }}
                        >
                          {t("Material batch application")}
                        </button>
                      </div>
                    </th>
                    <th style={{ minWidth: "90px" }}>
                      <div className="font-18 fw-bold">
                        {t("Optional Materials")}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {processAreaJoinList.map((item, index) => {
                    const areaInfo = selectedCartItem
                      ? selectedCartItem.areaList.find(
                          (cartAreaItem) =>
                            cartAreaItem.area_seq === item.area_seq
                        )
                      : null;
                    return (
                      <tr key={index} className="align-middle">
                        <td className="cell-padding">
                          <div className="d-flex">
                            <Checkbox
                              size="md"
                              round={true}
                              lightMode
                              checked={selectedAreqSeqs.includes(item.area_seq)}
                              onChange={() => {
                                let areqSeqs = [...selectedAreqSeqs];
                                if (selectAllAreas) {
                                  setSelectAllAreas(false);
                                }
                                if (areqSeqs.includes(item.area_seq)) {
                                  areqSeqs.splice(
                                    areqSeqs.indexOf(item.area_seq),
                                    1
                                  );
                                } else {
                                  areqSeqs.push(item.area_seq);
                                }
                                setSelectedAreaSeqs(areqSeqs);
                              }}
                              className="w-14 mr-15"
                            />
                            <img
                              className="icon_51"
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/img/interior/structure_room.png"
                              }
                            />
                          </div>
                        </td>
                        <td className="cell-padding">
                          <div className="font-18 fw-normal ml-15">
                            {item.area_name}
                          </div>
                        </td>
                        <td className="cell-padding">
                          <div className="flex-1  d-flex justify-content-center">
                            <button
                              className="material_select_button font-18 pr-20 pl-20 d-flex align-items-center text-black_2"
                              onClick={() => {
                                setSelectedAreaSeqs([item.area_seq]);
                                setSelectMaterialShow(true);
                              }}
                            >
                              {t("Material selection")}
                            </button>
                          </div>
                        </td>
                        <td className="cell-padding">
                          {areaInfo && areaInfo.product && (
                            <div className="flex-1 row-text align-items-center ">
                              <img
                                className="icon_42"
                                src={areaInfo.product.file_url}
                              />
                              <div className="font-14 text-black_1 fw-normal ml-10">
                                {areaInfo.product.product_code}{" "}
                                {areaInfo.product.product_name}
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="mt-50 row-text justify-content-center">
            <button
              className="basket_button mr-13"
              disabled={!selectedCartItem}
              onClick={() => {
                onAddToCart();
              }}
            >
              {t("a basket case")}
            </button>
            <button
              disabled={cartInfoList.length === 0}
              className="est_button"
              onClick={() => {
                const validInfo = checkBasketValidation();
                if (validInfo.valid) {
                  goToStep(5);
                } else {
                  const missedRooms = [];
                  for (let i = 0; i < validInfo.roomCount; i++) {
                    let roomId = i + 1;
                    const roomName = "방" + roomId;
                    if (!validInfo.selectedRoomNames?.includes(roomName)) {
                      missedRooms.push(roomName);
                    }
                  }
                  dispatch(
                    setErrorMessage(
                      `${missedRooms.join(", ")}에 대해 도배공정을 선택해주세요`
                    )
                  );
                  dispatch(setShowAlert(true));
                }
              }}
            >
              {t("Make an estimate")}
            </button>
          </div>
        </div>
      </div>

      <SelectMaterialModal
        show={selectMaterialShow}
        selectedProcessSeq={selectedProcessSeq}
        selectedAreqSeqs={selectedAreqSeqs}
        onHide={() => setSelectMaterialShow(false)}
        onSelectProduct={onSelectProduct}
      />
    </div>
  );
};

export default InteriorProcessStep;
