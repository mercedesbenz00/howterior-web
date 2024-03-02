import PropTypes from "prop-types";
import clsx from "clsx";
import bannerData from "../../data/banner/banner-fourteen.json";
import BannerFourteenSingle from "../../components/banner/BannerFourteenSingle.js";

const BannerFourteen = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {bannerData?.map((single, key) => (
            <div className="col-lg-4 col-md-4" key={key}>
              <BannerFourteenSingle data={single} spaceBottomClass="mb-30" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BannerFourteen.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BannerFourteen;
