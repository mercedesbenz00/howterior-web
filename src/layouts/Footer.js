import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const Footer = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  spaceLeftClass,
  spaceRightClass,
  containerClass,
  extraFooterClass,
  sideMenu,
}) => {
  const { t } = useTranslation();

  return (
    <footer
      className={clsx(
        "footer-area",
        backgroundColorClass,
        spaceTopClass,
        spaceBottomClass,
        extraFooterClass,
        spaceLeftClass,
        spaceRightClass
      )}
    >
      <div className={`${containerClass ? containerClass : "container"}`}>
        <div className="row">
          <div
            className={`${
              sideMenu ? "col-xl-4 col-sm-8" : "col-lg-4 col-sm-8"
            }`}
          >
            <div className="footer-widget mb-30 ml-30 font-14 text-white lh-25">
              <div>{t("HOWTERIOR")}</div>
              <div>
                {t("Company Registration Number")}&nbsp;&nbsp;&nbsp;
                111-11-11111 &nbsp;&nbsp;&nbsp;
                {t("Check business information")}
              </div>
              <div>
                {t("Telecommunication sales business report number")}
                &nbsp;&nbsp;&nbsp; 2022-
                {t("Seoul Jung-gu")}-0365
              </div>
              <div>
                {t("CEO")}&nbsp;&nbsp;&nbsp;
                {t("Sangjin Han")}
              </div>
              <div>
                {t("address")}
                &nbsp;&nbsp;&nbsp;
                {t("Seocho-dong, Gangnam-gu, Seoul")}1111
              </div>
              <div className="mt-5 text-gray_3">
                &copy; {new Date().getFullYear()} Howterior. All Rights Reserved
              </div>
            </div>
          </div>
          <div
            className={`${
              sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
            }`}
          >
            <div className="footer-widget mb-30 ml-30">
              <div className="footer-widget mb-30 ml-30 font-14 text-white lh-25">
                <div>CS CENTER</div>
                <div>&nbsp;</div>
                <div>{t("announcement")}</div>
                <div>{t("Information Use")}</div>
                <div>FAQ</div>
                <div>1:1 {t("inquiry")}</div>
              </div>
            </div>
          </div>
          <div
            className={`${
              sideMenu
                ? "col-xl-2 col-sm-4 text-white mb-30"
                : "col-lg-2 col-sm-4 text-white mb-30"
            }`}
          >
            <div>Company</div>
            <div>&nbsp;</div>
            <div className="text-gold">{t("privacy policy")}</div>
            <div>{t("Terms of Service")}</div>
            <div>{t("service introduction")}</div>
          </div>
          <div
            className={`${
              sideMenu ? "col-xl-3 col-sm-8" : "col-lg-4 col-sm-6"
            }`}
          >
            <div className="share-social row-text">
              <a className="facebook text-white mr-70" href="//facebook.com">
                <i className="fa fa-facebook font-20" />
              </a>
              <a className="instagram text-white mr-70" href="//instagram.com">
                <i className="fa fa-instagram font-20" />
              </a>
              <a className="twitter text-white" href="//twitter.com">
                <i className="fa fa-twitter  font-20" />
              </a>
            </div>
            <div className="font-20 lh-28 text-white mt-60 w-200 text-align-right">
              080-111-1212
            </div>
            <div className="font-14 lh-25 text-white w-200 text-align-right">
              KST 09:00 ~ 18:00
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default Footer;
