import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Logo from "../components/header/Logo";
import NavMenu from "../components/header/NavMenu";
import IconGroup from "../components/header/IconGroup";
import MobileMenu from "../components/header/MobileMenu";

const Header = ({
  layout,
  headerPaddingClass,
  headerPositionClass,
  headerBgClass,
}) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector(".sticky-bar");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header
      className={clsx(
        "header-area clearfix",
        headerBgClass,
        headerPositionClass
      )}
    >
      <div
        className={clsx(
          headerPaddingClass,
          "sticky-bar header-res-padding clearfix",
          scroll > headerTop && "stick"
        )}
      >
        <div
          className={
            layout === "container-fluid"
              ? layout
              : "container header-container d-flex align-items-center justify-content-between"
          }
        >
          <div>
            {/* header logo */}
            <Logo imageUrl="/assets/img/logo/logo.svg" logoClass="logo" />
          </div>
          <div className="d-none d-lg-block w-100">
            {/* Nav menu */}
            <NavMenu />
          </div>
          <div className="d-flex flex-shrink-0 justify-content-end">
            {/* Icon group */}
            <IconGroup />
          </div>
        </div>
        {/* mobile menu */}
        <MobileMenu />
      </div>
    </header>
  );
};

Header.propTypes = {
  borderStyle: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  layout: PropTypes.string,
  top: PropTypes.string,
};

export default Header;
