import PropTypes from "prop-types";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingleEleven from "../../components/product/ProductGridSingleEleven";

const ProductGridEleven = ({
  category,
  type,
  limit,
  spaceBottomClass,
  colorClass,
  productGridStyleClass,
}) => {
  const { products } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const prods = getProducts(products, category, type, limit);
  return (
    <Fragment>
      {prods?.map((product) => {
        return (
          <ProductGridSingleEleven
            spaceBottomClass={spaceBottomClass}
            colorClass={colorClass}
            productGridStyleClass={productGridStyleClass}
            product={product}
            currency={currency}
            cartItem={cartItems.find((cartItem) => cartItem.id === product.id)}
            wishlistItem={wishlistItems.find(
              (wishlistItem) => wishlistItem.id === product.id
            )}
            compareItem={compareItems.find(
              (compareItem) => compareItem.id === product.id
            )}
            key={product.id}
          />
        );
      })}
    </Fragment>
  );
};

ProductGridEleven.propTypes = {
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  productGridStyleClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number,
};

export default ProductGridEleven;
