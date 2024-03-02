import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useSelector } from "react-redux";

const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
  const { t } = useTranslation();
  const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <div
      className={clsx(
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      )}
    >
      <nav>
        <ul className="d-flex align-items-center " style={{ gap: "100px" }}>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {t("service_introduction")}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/interior"}>
                  {t("interior_request")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/bubble"}>
                  {t("bubble_quote_diagnosis")}
                </Link>
              </li>
            </ul>
          </li>
          {/* <li>
            <Link to={process.env.PUBLIC_URL + "/"}>{t("gallery")}</Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {t("material_service_mall")}
            </Link>
          </li> */}
          <li>
            <Link to={process.env.PUBLIC_URL + "/interior"}>
              {t("start_interior")}
            </Link>
          </li>
          {currentUser && (
            <li>
              <Link to={process.env.PUBLIC_URL + "/mypage"}>
                {t("My Page")}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
};

export default NavMenu;
