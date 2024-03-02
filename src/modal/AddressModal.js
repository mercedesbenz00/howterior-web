import React from "react";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const addressList = [
  {
    number: "06259",
    name: "서울특별시 서초구 신반포로 370",
    local_number: "서울특별시 서초구  잠원동 1-12",
  },
  {
    number: "06259",
    name: "서울특별시 서초구 신반포로 370",
    local_number: "서울특별시 서초구  잠원동 1-12",
  },
  {
    number: "06259",
    name: "서울특별시 서초구 신반포로 370",
    local_number: "서울특별시 서초구  잠원동 1-12",
  },
  {
    number: "06259",
    name: "서울특별시 서초구 신반포로 370",
    local_number: "서울특별시 서초구  잠원동 1-12",
  },
  {
    number: "06259",
    name: "서울특별시 서초구 신반포로 370",
    local_number: "서울특별시 서초구  잠원동 1-12",
  },
  {
    number: "06259",
    name: "서울특별시 서초구 신반포로 370",
    local_number: "서울특별시 서초구  잠원동 1-12",
  },
];
function AddressModal({ onConfirm, ...props }) {
  const { t } = useTranslation();
  const [address, setAddress] = useState("");
  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton className="pb-0">
          <Modal.Title className="font-16">{t("Search Addresses")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="pb-30">
            <div className="row-text w-100  mt-30 align-items-center">
              <div className="h-45 flex-1">
                <input
                  className="border-0px bg-white"
                  type="text"
                  placeholder={t(
                    "Enter road name, lot number, and building name."
                  )}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  required
                />
              </div>
              <div
                className="mr-15"
                onClick={() => {
                  setAddress("");
                }}
              >
                <img
                  className="icon_13"
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/img/interior/close_black.png"
                  }
                  alt=""
                />
              </div>
              <div className="mr-5">
                <img
                  className="icon_13"
                  src={process.env.PUBLIC_URL + "/assets/img/join/search.png"}
                  alt=""
                />
              </div>
            </div>
            <div className="line bg-black-1 mb-20" onClick={onConfirm}></div>
            {address.length === 0 && (
              <div>
                <div className="mt-10 font-12 lh-22 text-black_1 fw-500">
                  {t("Useful Tips for How to Search for Addresses!")}
                </div>
                <div className="mt-10 font-12 lh-22 text-black_1 fw-400">
                  {t("· Dong/Eup/Myeon/ri + Bungee (e.g., Susong-dong 146-1)")}
                </div>
                <div className="font-12 lh-22 text-black_1 fw-400">
                  {t(
                    "· Enter road name + building number (e.g., 42 Jongno 1-gil)"
                  )}
                </div>
                <div className="font-12 lh-22 text-black_1 fw-400">
                  {t("· Enter building name (e.g. Ima Building)")}
                </div>
              </div>
            )}
            {address.length > 0 && address.length < 5 && (
              <div>
                <div className="mt-10 font-12 lh-22 text-black_1 fw-500">
                  {t("No search results found.")}
                </div>
                <div className="mt-10 font-12 lh-22 text-black_1 fw-400">
                  {t("Please enter the correct address.")}
                </div>
              </div>
            )}
            {address.length > 4 && (
              <div className="h-300 scroll_y border-gray1-1px">
                {addressList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="pt-5 pb-10 pr-15 pl-15 border-gray1-1px"
                    >
                      <div className="font-12 lw-22 text-black_1 fw-400">
                        {item.number}
                      </div>
                      <div className="row-text align-items-center ">
                        <div className="border-05px-gray br-3 w-33  text-gray_2 font-9 lh-13 h-13 text-center mr-10">
                          {t("Road name")}
                        </div>
                        <div className="font-12 lw-22 text-black_1 ">
                          {item.name}
                        </div>
                      </div>
                      <div className="row-text align-items-center ">
                        <div className="border-05px-gray br-3 w-33  text-gray_2 font-9 lh-13 h-13 text-center mr-10">
                          {t("a local number")}
                        </div>
                        <div className="font-12 lw-22 text-black_1 ">
                          {item.local_number}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddressModal;
