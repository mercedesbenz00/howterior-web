import PropTypes from "prop-types";
import clsx from "clsx";
import funFactData from "../../data/fun-fact/fun-fact-one.json";
import FunFactOneSingle from "../../components/fun-fact/FunFactOneSingle.js";

const FunFactOne = ({ spaceTopClass, spaceBottomClass, bgClass }) => {
  return (
    <div
      className={clsx("funfact-area", spaceTopClass, spaceBottomClass, bgClass)}
    >
      <div className="container">
        <div className="row">
          {funFactData?.map((single, key) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={key}>
              <FunFactOneSingle
                data={single}
                spaceBottomClass="mb-30"
                textAlignClass="text-center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

FunFactOne.propTypes = {
  bgClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default FunFactOne;
