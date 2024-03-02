import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { logout } from "../../store/slices/auth-slice";
// import MenuCart from "./sub-components/MenuCart";

const IconGroup = ({ iconWhiteClass }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  // const handleClickInterior = () => {
  //   navigate("/interior");
  // };

  const handleLogout = () => {
    dispatch(logout());
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  // const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)}>
      <div className="same-style header-auth d-none d-lg-block">
        {isLoggedIn ? (
          <a onClick={() => handleLogout()}>{t("logout")}</a>
        ) : (
          <Link to={process.env.PUBLIC_URL + "/login"}>{t("login")}</Link>
        )}
      </div>
      <div className="d-none d-lg-block">
        {/* <button className="primary-btn" onClick={() => handleClickInterior()}>
          {t("start_interior")}
        </button> */}
        {/* <button className="icon-cart" onClick={e => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </button> */}
        {/* menu cart */}
        {/* <MenuCart /> */}
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
