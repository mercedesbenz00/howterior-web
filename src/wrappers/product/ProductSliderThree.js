import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitleSeven from "../../components/section-title/SectionTitleSeven";
import ProductGridEight from "./ProductGridEight";

const ProductSliderThree = ({ spaceBottomClass, category, colorClass }) => {
  return (
    <div className={clsx("related-product-area", spaceBottomClass)}>
      <div className="container">
        <SectionTitleSeven
          titleText="Our Products"
          subtitleText="Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          positionClass="text-center"
          spaceClass="mb-55"
          borderClass="no-border"
        />
        <ProductGridEight
          category={category}
          limit={6}
          colorClass={colorClass}
        />
      </div>
    </div>
  );
};

ProductSliderThree.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductSliderThree;
