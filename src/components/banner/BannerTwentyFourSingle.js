import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const BannerTwentyFourSingle = ({ data, spaceBottomClass }) => {
  return (
    <div className={clsx("single-banner", spaceBottomClass)}>
      <Link to={process.env.PUBLIC_URL + data.link}>
        <img src={process.env.PUBLIC_URL + data.image} alt="" />
      </Link>
      <div className="banner-content">
        <h3>{data.title}</h3>
        <h4>
          {data.subtitle} <span>{data.price}</span>
        </h4>
        <Link to={data.link}>
          <i className="fa fa-long-arrow-right" />
        </Link>
      </div>
    </div>
  );
};

BannerTwentyFourSingle.propTypes = {
  data: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
};

export default BannerTwentyFourSingle;
