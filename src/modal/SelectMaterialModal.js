import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

import Swiper, { SwiperSlide } from "../components/swiper";
import MaterialOptionModal from "./MaterialOptionModal";
import productService from "../services/product.service";
import useWindowSize from "../hooks/use-window-size";

const colorList = [
  "#fff",
  "#1a2217",
  "#3a3f4d",
  "#5e6474",
  "#cbd5e1",
  "#e2e8f0",
  "#d0ae8c",
  "#ffa819",
  "#ffb801",
];

const settings = {
  loop: false,
  grabCursor: true,
  observer: true,
  observeParents: true,
  grid: {
    rows: 2,
    fill: "row",
  },
  spaceBetween: 24,
  navigation: true,
  autoHeight: false,
  breakpoints: {
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
    1600: {
      slidesPerView: 5,
    },
  },
};

function SelectMaterialModal({
  selectedProcessSeq,
  selectedAreqSeqs,
  onSelectProduct,
  ...props
}) {
  const { t } = useTranslation();
  const [materialOptionShow, setMaterialOptionShow] = useState(false);
  const [materialList, setMaterialList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { width: screenWidth } = useWindowSize();

  const isMobileView = () => {
    if (screenWidth < 768) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (props.show) {
      productService
        .getProductList({
          page: 1,
          page_block: 30,
          is_countent: "N",
          process_seqs: [selectedProcessSeq],
          area_seqs: selectedAreqSeqs,
        })
        .then((req) => {
          if (req.data.success) {
            setTotalCount(req.data.data?.pageVo?.totalCount);
            setMaterialList(req.data.data?.list || []);
          }
        });
    }
  }, [props.show]);
  return (
    <>
      <Modal dialogClassName="material-pickup-dialog" centered {...props}>
        <div className="column pt-40">
          <div className="row-text pr-30 pl-30">
            <div className="flex-1 text-center font-18 fw-bold">
              ② {t("Material selection")}
            </div>
            <img
              onClick={props.onHide}
              className="icon_18 cursor-pointer"
              src={
                process.env.PUBLIC_URL + "/assets/img/interior/close_black.png"
              }
            />
          </div>
          <div className="select-material-content w-100">
            <div className="d-flex color-content justify-content-end">
              {colorList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="color-item"
                    style={{ backgroundColor: item }}
                  ></div>
                );
              })}
            </div>
            <div className="font-14 text-black_1 text-align-initial mt-10 pl-10">
              {t("Total")} {totalCount} {t("Count")}
            </div>
            {!isMobileView() && (
              <div className="position-relative mt-20">
                <Swiper
                  className="position-static swiper--center"
                  customLeftNavStyle={{
                    marginTop: "-48px",
                    marginLeft: "-120px",
                  }}
                  customRightNavStyle={{
                    marginTop: "-48px",
                    marginRight: "-110px",
                  }}
                  centeredSlides
                  options={settings}
                >
                  {materialList &&
                    materialList.map((item, index) => (
                      <SwiperSlide key={"material_" + index}>
                        <div
                          onClick={() => {
                            setSelectedProduct(
                              JSON.parse(JSON.stringify(item))
                            );
                            setMaterialOptionShow(true);
                          }}
                        >
                          <img
                            className="icon_220"
                            src={
                              item.file_url
                                ? item.file_url
                                : process.env.PUBLIC_URL +
                                  "assets/img/materials/material7.png"
                            }
                          />
                          <div className="font-12 text-gray_1 mt-10">
                            {item.product_name}
                          </div>
                          <div className="font-14 text-black_1">
                            {item.product_code}
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            )}

            {isMobileView() && (
              <div className="row">
                {materialList &&
                  materialList.map((item, index) => (
                    <div key={"material_" + index} className="col-6">
                      <div
                        className="mt-24"
                        onClick={() => {
                          setSelectedProduct(JSON.parse(JSON.stringify(item)));
                          setMaterialOptionShow(true);
                        }}
                      >
                        <img
                          className="material-card-img w-100"
                          src={
                            item.file_url
                              ? item.file_url
                              : process.env.PUBLIC_URL +
                                "assets/img/materials/material7.png"
                          }
                        />
                        <div className="font-12 text-gray_1 mt-10">
                          {item.product_name}
                        </div>
                        <div className="font-14 text-black_1">
                          {item.product_code}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <MaterialOptionModal
          size="md"
          show={materialOptionShow}
          productSeq={selectedProduct?.product_seq || null}
          onHide={() => setMaterialOptionShow(false)}
          onConfirm={(optionValueMap) => {
            onSelectProduct(
              selectedProcessSeq,
              selectedAreqSeqs,
              selectedProduct,
              optionValueMap
            );
            setMaterialOptionShow(false);
            props.onHide();
          }}
        />
      </Modal>
    </>
  );
}

export default SelectMaterialModal;
