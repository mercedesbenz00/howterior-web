import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import Swiper, { SwiperSlide } from "../../components/swiper";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGridSingleThirteen from "../../components/product/ProductGridSingleThirteen";
import { getProducts } from "../../helpers/product";

const settings = {
  loop: false,
  slidesPerView: 4,
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

const ProductSliderTwo = ({ spaceBottomClass, category }) => {
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
                <ProductGridSingleThirteen
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

ProductSliderTwo.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductSliderTwo;
