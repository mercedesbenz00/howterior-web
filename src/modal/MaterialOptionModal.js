import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

import productService from "../services/product.service";

import SelectBox from "../components/selectBox/SelectBox";

// const options = [
//   { name: "방1", price: "400,000 원" },
//   { name: "방2", price: "800,000 원" },
// ];
function MaterialOptionModal({ onConfirm, productSeq, ...props }) {
  const { t } = useTranslation();
  const [productDetail, setProductDetail] = useState(null);
  const [optionList, setOptionList] = useState([]);
  const [optionValueMap, setOptionValueMap] = useState({});

  useEffect(() => {
    if (props.show && productSeq !== null) {
      setOptionValueMap({});
      productService
        .getProductDetail({
          product_seq: productSeq,
        })
        .then((req) => {
          if (req.data.success) {
            setProductDetail(req.data.data);
            const itemsOptionList = [];
            let valueMap = {};
            const { productCatVos3, productCatVos4 } = req.data.data;
            for (const optionLabel of productCatVos3) {
              if (optionLabel.name) {
                let optionLabelInfo = { ...optionLabel };
                optionLabelInfo.options = [];
                if (productCatVos4 && productCatVos4.length) {
                  let optionValueItems = productCatVos4
                    .filter(
                      (valueItem) => valueItem.parent_seq === optionLabel.seq
                    )
                    .map((optionValueItem) => ({
                      label: optionValueItem.name,
                      value: optionValueItem.seq,
                    }));
                  if (optionValueItems.length) {
                    optionLabelInfo.options = optionValueItems;

                    valueMap[String(optionLabel.seq)] =
                      optionValueItems[0].value;
                  }
                }
                itemsOptionList.push(optionLabelInfo);
              }
            }
            setOptionList(itemsOptionList);
            setOptionValueMap(valueMap);
          }
        });
    }
  }, [props.show, productSeq]);

  const onChangeOption = (parentSeq, val) => {
    let newOptionValueMap = { ...optionValueMap };
    newOptionValueMap[String(parentSeq)] = val.value;
    setOptionValueMap(newOptionValueMap);
  };

  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton className="mb-0 pb-0">
          <div className="font-16 fw-500">{t("Product Options")}</div>
        </Modal.Header>
        <Modal.Body>
          <div className="line bg-gray-8 mb-30"></div>
          {productDetail && (
            <div className="pr-25 pl-25">
              <div className="row-text">
                <img className="icon_150" src={productDetail.file_url} alt="" />
                <div className="ml-15 d-flex column">
                  <div className="font-12 lh-22 text-gray_1">
                    {productDetail ? productDetail.product_name : ""}
                  </div>
                  <div className="font-14 lh-25 text-black_1">
                    {productDetail.product_code} {productDetail.color_name}
                  </div>
                  <div className="flex-1" />
                  {/* <div className="font-16 lh-25 text-black_1">9,000 원/m² </div> */}
                </div>
              </div>
              <div className="mt-20">
                {optionList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex mb-10 align-items-center text-black_1"
                    >
                      <span
                        className="font-13 text-gray_2"
                        style={{ minWidth: "96px" }}
                      >
                        {item.name}
                      </span>
                      <SelectBox
                        className="w-100"
                        placeholder={item.name}
                        options={item.options}
                        value={item.options.find((option) => {
                          return (
                            option.value === optionValueMap[String(item.seq)]
                          );
                        })}
                        onChange={(val) => onChangeOption(item.seq, val)}
                      />
                    </div>
                  );
                })}
              </div>
              {/* <div className="row-text mt-25 align-items-center">
                <div className="font-12 text-gray_2 mr-40">{t("Space")}</div>
                <div className="flex-1 font-14 text-gray_2 select_container pr-20 pl-20">
                  <select onChange={() => {}}>
                    <option value="default">{t("space selection")}</option>
                    <option value="priceHighToLow">Price - High to Low</option>
                    <option value="priceLowToHigh">Price - Low to High</option>
                  </select>
                </div>
              </div>
              <div className="mt-20">
                {options.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="row-text option_item mb-10 pr-20 pl-20 align-items-center font-12 text-black_1"
                    >
                      <div>{item.name}</div>
                      <div className="flex-1" />
                      <div className="mr-20">{item.price}</div>
                      <img
                        className="icon_15"
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/img/interior/close.png"
                        }
                        alt=""
                      />
                    </div>
                  );
                })}
              </div> */}
              {/* <div className="mt-20 row-text lh-25">
                <div className="font-14">총 2실</div>
                <div className="flex-1" />
                <div className="font-16">120,000 원</div>
              </div> */}
              {/* <div className="line mt-10 bg-gray-2"></div> */}
              <div className="mt-42 row-text justify-content-center">
                <button
                  className="next_button"
                  onClick={() => onConfirm({ ...optionValueMap })}
                >
                  {t("Choose")}
                </button>
                {/* <div className="basket_button mr-15" onClick={() => {}}>
                  {t("a shopping basket")}
                </div>
                <div className="next_button" onClick={onConfirm}>
                  {t("To buy")}
                </div> */}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default MaterialOptionModal;
