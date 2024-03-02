import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { getProducts } from "../../helpers/product";
import ProductGridSingleEight from "../../components/product/ProductGridSingleEight";

const settings = {
  loop: false,
  slidesPerView: 1,
  spaceBetween: 30,
  grabCursor: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
};

const ProductGridEight = ({
  category,
  type,
  limit,
  spaceBottomClass,
  colorClass,
}) => {
  const { products } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const prods = getProducts(products, category, type, limit);

  if (!prods?.length) return <p>No products found</p>;

  return (
    <Swiper options={settings}>
      {prods.map((product) => {
        return (
          <SwiperSlide key={product.id}>
            <ProductGridSingleEight
              spaceBottomClass={spaceBottomClass}
              colorClass={colorClass}
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
        );
      })}
    </Swiper>
  );
};

ProductGridEight.propTypes = {
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number,
};

export default ProductGridEight;
