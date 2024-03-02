import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingleThree from "../../components/product/ProductGridSingleThree";

const ProductGridThree = ({ spaceBottomClass, category, type, limit }) => {
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
          <div className="custom2-col-5" key={product.id}>
            <ProductGridSingleThree
              spaceBottomClass={spaceBottomClass}
              product={product}
              currency={currency}
              cartItem={cartItems.find(
                (cartItem) => cartItem.id === product.id
              )}
              wishlistItem={wishlistItems.find(
                (wishlistItem) => wishlistItem.id === product.id
              )}
              compareItem={compareItems.find(
                (compareItem) => compareItem.id === product.id
              )}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

ProductGridThree.propTypes = {
  spaceBottomClass: PropTypes.string,
};

export default ProductGridThree;
