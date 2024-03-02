import clsx from "clsx";
import SectionTitleSix from "../../components/section-title/SectionTitleSix";
import ProductGridSix from "./ProductGridSix";

const ProductGridSixContainer = ({ spaceBottomClass }) => {
  return (
    <div className={clsx("product-grid-six-container", spaceBottomClass)}>
      <div className="container">
        <SectionTitleSix
          sectionTitle="TOP RATED PRODUCTS"
          spaceBottomClass="mb-60"
        />
        <div className="row">
          <ProductGridSix
            category="electronics"
            limit={6}
            spaceBottomClass="mb-25"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGridSixContainer;
