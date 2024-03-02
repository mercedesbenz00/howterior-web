import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BannerProcess = ({ spaceTopClass, spaceBottomClass }) => {
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        "banner-area",
        spaceTopClass,
        spaceBottomClass,
        "bg-gray-main"
      )}
    >
      <div className="container container--xl">
        <h3 className="color-black3">Howterior Gallery</h3>
        <span className="banner-title">
          {t("howterior")}
          <span className="stroke">{t("howterior_process_part2")}</span>
        </span>
        <Link to={process.env.PUBLIC_URL + "/"}>
          <img
            className="w-100 mt-80"
            src={
              process.env.PUBLIC_URL +
              "/assets/img/icon-img/home/interior_process.svg"
            }
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

BannerProcess.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BannerProcess;
