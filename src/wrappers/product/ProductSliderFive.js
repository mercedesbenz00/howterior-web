import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { getProducts } from "../../helpers/product";
import ProductGridSingleEleven from "../../components/product/ProductGridSingleEleven";

const settings = {
  loop: false,
  slidesPerView: 1,
  grabCursor: true,
  spaceBetween: 30,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
};

const ProductSliderFive = ({
  spaceBottomClass,
  category,
  productGridStyleClass,
  type,
}) => {
  const { products } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const prods = getProducts(products, category, type, 6);

  if (!prods?.length) return <p>No Products Found</p>;

  return (
    <div className={clsx("related-product-area", spaceBottomClass)}>
      <Swiper options={settings}>
        {prods.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductGridSingleEleven
              spaceBottomClass={spaceBottomClass}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

ProductSliderFive.propTypes = {
  category: PropTypes.string,
  productGridStyleClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductSliderFive;
