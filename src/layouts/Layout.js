import PropTypes from "prop-types";
import { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../components/scroll-to-top";

const Layout = ({
  children,
  headerContainerClass,
  headerTop,
  headerPaddingClass,
  headerPositionClass,
}) => {
  return (
    <Fragment>
      <Header
        layout={headerContainerClass}
        top={headerTop}
        headerPaddingClass={headerPaddingClass}
        headerPositionClass={headerPositionClass}
      />
      {children}
      <Footer
        backgroundColorClass="bg-main-black"
        spaceTopClass="pt-70"
        spaceBottomClass="pb-50"
      />
      <ScrollToTop />
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  headerContainerClass: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  headerTop: PropTypes.string,
};

export default Layout;
