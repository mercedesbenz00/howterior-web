import PropTypes from "prop-types";
import clsx from "clsx";
import ProductGridFive from "./ProductGridFive";

const ProductGridFiveContainer = ({
  spaceTopClass,
  spaceBottomClass,
  category,
}) => {
  return (
    <div
      className={clsx(
        "product-area hm5-section-padding",
        spaceTopClass,
        spaceBottomClass
      )}
    >
      <div className="container-fluid">
        <div className="row">
          <ProductGridFive
            category={category}
            limit={12}
            spaceBottomClass="mb-20"
          />
        </div>
      </div>
    </div>
  );
};

ProductGridFiveContainer.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ProductGridFiveContainer;
