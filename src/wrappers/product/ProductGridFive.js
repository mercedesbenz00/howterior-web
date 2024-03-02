import PropTypes from "prop-types";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingleFive from "../../components/product/ProductGridSingleFive";

const ProductGridFive = ({
  sliderClassName,
  spaceBottomClass,
  category,
  type,
  limit,
}) => {
  const { products } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const prods = getProducts(products, category, type, limit);

  return (
    <Fragment>
      {prods?.map((product) => (
        <div
          className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12"
          key={product.id}
        >
          <ProductGridSingleFive
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            currency={currency}
            cartItem={cartItems.find((cartItem) => cartItem.id === product.id)}
            wishlistItem={wishlistItems.find(
              (wishlistItem) => wishlistItem.id === product.id
            )}
            compareItem={compareItems.find(
              (compareItem) => compareItem.id === product.id
            )}
          />
        </div>
      ))}
    </Fragment>
  );
};

ProductGridFive.propTypes = {
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number,
};

export default ProductGridFive;
