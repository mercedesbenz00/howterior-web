import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingleTen from "../../components/product/ProductGridSingleTen";

const ProductGridTen = ({
  spaceBottomClass,
  colorClass,
  productGridStyleClass,
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
      {prods?.map((product) => {
        return (
          <div className="col-md-6 col-lg-4 col-sm-6" key={product.id}>
            <ProductGridSingleTen
              spaceBottomClass={spaceBottomClass}
              colorClass={colorClass}
              productGridStyleClass={productGridStyleClass}
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

ProductGridTen.propTypes = {
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  productGridStyleClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number,
};

export default ProductGridTen;
