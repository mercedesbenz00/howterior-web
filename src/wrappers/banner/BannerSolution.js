import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BannerSolution = ({ spaceTopClass, spaceBottomClass }) => {
  const { t } = useTranslation();
  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)}>
      <div className="container container--xl">
        <h3 className="color-black3">What do we offer</h3>
        <span className="banner-title">
          {t("howterior_providing_solution_part1")}
          <span className="stroke">
            {t("howterior_providing_solution_part2")}
          </span>
        </span>
        <div className="row mt-70">
          <div className="col-md-7 mt-10">
            <Link to={process.env.PUBLIC_URL + "/interior"}>
              <div
                className="single-banner solution-banner-content
                justify-content-between align-items-md-end align-items-center
               bg-main-black d-flex first-row"
              >
                <div className="d-flex flex-column justify-content-md-end justify-content-center h-100">
                  <h3 className="fw-bold color-white-1">{t("just_at_home")}</h3>
                  <span className="text-white f-size-40 mt-10">
                    {t("none_face_to_face_quote_consult")}
                  </span>
                  <p className="text-white mt-25">{t("home_block_desc1")}</p>
                </div>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/img/icon-img/home/contract.png"
                  }
                  alt=""
                />
              </div>
            </Link>
          </div>
          <div className="col-md-5 mt-10">
            <Link to={process.env.PUBLIC_URL + "/interior"}>
              <div
                className="single-banner solution-banner-content
                justify-content-between align-items-md-end align-items-center
               bg-main-black d-flex first-row"
              >
                <div className="d-flex flex-column justify-content-md-end justify-content-center h-100">
                  <h4 className="fw-bold color-white-1">Howterior</h4>
                  <span className="text-white f-size-32">
                    {t("start_howterior")}
                  </span>
                </div>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/img/icon-img/home/arrow_right.png"
                  }
                  alt=""
                />
              </div>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mt-10">
            <Link to={process.env.PUBLIC_URL + "/interior"}>
              <div
                className="single-banner solution-banner-content
                justify-content-between align-items-md-end align-items-center
                bg-black-3 d-flex second-row"
              >
                <div className="d-flex flex-column justify-content-md-end justify-content-center h-100">
                  <h3 className="fw-bold color-white-1">
                    {t("choose_materials")}
                  </h3>
                  <span className="text-white f-size-40 mt-10">
                    {t("transparent_price")}
                  </span>
                  <p className="text-white mt-25">{t("home_block_desc2")}</p>
                </div>
                <div className="banner-image-group position-relative">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/img/icon-img/home/money_box.png"
                    }
                    alt=""
                  />
                  <img
                    style={{ marginLeft: "-36px" }}
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/img/icon-img/home/cost_est.png"
                    }
                    alt=""
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-6 mt-10">
            <Link to={process.env.PUBLIC_URL + "/interior"}>
              <div
                className="single-banner solution-banner-content
                justify-content-between align-items-md-end align-items-center
                bg-gray d-flex second-row"
              >
                <div className="d-flex flex-column justify-content-md-end justify-content-center h-100">
                  <h3 className="fw-bold color-black2">
                    {t("construction_management_customer_view")}
                  </h3>
                  <span className="text-black f-size-40">
                    {t("expert_matching")}
                  </span>
                  <p className="color-black3 mt-25">{t("home_block_desc3")}</p>
                </div>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/img/icon-img/home/expert-matching.png"
                  }
                  alt=""
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

BannerSolution.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BannerSolution;
