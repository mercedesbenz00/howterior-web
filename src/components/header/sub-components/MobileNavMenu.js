import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const MobileNavMenu = () => {
  const { t } = useTranslation();
  const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>
            {t("service_introduction")}
          </Link>
          <ul className="sub-menu">
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
            <Link to={process.env.PUBLIC_URL + "/mypage"}>{t("My Page")}</Link>
          </li>
        )}
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>{t("other_pages")}</Link>
          <ul className="sub-menu">
            <li>
              <Link to={process.env.PUBLIC_URL + "/login"}>{t("login")}</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/contact"}>
                {t("sign_up")}
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavMenu;
