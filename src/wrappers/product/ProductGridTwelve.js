import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { getProducts } from "../../helpers/product";
import ProductGridSingleTwelve from "../../components/product/ProductGridSingleTwelve";

const settings = {
  loop: false,
  grabCursor: true,
  observer: true,
  observeParents: true,
  spaceBetween: 30,
  navigation: true,
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

const ProductGridTwo = ({
  spaceBottomClass,
  colorClass,
  titlePriceClass,
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

  if (!prods?.length) return <p>No products found</p>;

  return (
    <Swiper className="position-static" options={settings}>
      {prods.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductGridSingleTwelve
            spaceBottomClass={spaceBottomClass}
            colorClass={colorClass}
            product={product}
            currency={currency}
            cartItem={cartItems.find((cartItem) => cartItem.id === product.id)}
            wishlistItem={wishlistItems.find(
              (wishlistItem) => wishlistItem.id === product.id
            )}
            compareItem={compareItems.find(
              (compareItem) => compareItem.id === product.id
            )}
            titlePriceClass={titlePriceClass}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

ProductGridTwo.propTypes = {
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  titlePriceClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number,
};

export default ProductGridTwo;
