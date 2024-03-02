import PropTypes from "prop-types";
import clsx from "clsx";
import { useSelector } from "react-redux";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { getProducts } from "../../helpers/product";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGridSingleTwelve from "../../components/product/ProductGridSingleTwelve";

const settings = {
  loop: false,
  slidesPerView: 4,
  spaceBetween: 30,
  grabCursor: true,
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

const ProductSlider = ({ spaceBottomClass, category }) => {
  const { products } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const prods = getProducts(products, category, null, 6);

  return (
    <div className={clsx("related-product-area", spaceBottomClass)}>
      <div className="container">
        <SectionTitle
          titleText="Our Products"
          positionClass="text-center"
          spaceClass="mb-55"
          borderClass="no-border"
        />
        {prods?.length ? (
          <Swiper options={settings}>
            {prods.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductGridSingleTwelve
                  spaceBottomClass={spaceBottomClass}
                  colorClass="pro-puce-color"
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
        ) : null}
      </div>
    </div>
  );
};

ProductSlider.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductSlider;
