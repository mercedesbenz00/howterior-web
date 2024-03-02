import PropTypes from "prop-types";
import clsx from "clsx";
import { useSelector } from "react-redux";
import Swiper, { SwiperSlide } from "../../components/swiper";
import SectionTitleThree from "../../components/section-title/SectionTitleThree";
import ProductGridSingleTwelve from "../../components/product/ProductGridSingleTwelve";
import { getProducts } from "../../helpers/product";

const settings = {
  loop: false,
  grabCursor: true,
  observer: true,
  observeParents: true,
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

const NewProductSlider = ({
  spaceTopClass,
  spaceBottomClass,
  category,
  limit,
}) => {
  const { products } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const prods = getProducts(products, category, "new", limit);

  return (
    <div className={clsx("new-product-area", spaceBottomClass, spaceTopClass)}>
      <div className="container">
        <SectionTitleThree
          titleText="New Products"
          positionClass="text-center"
          spaceClass="mb-60"
        />
        {prods?.length ? (
          <Swiper options={settings}>
            {prods.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductGridSingleTwelve
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

NewProductSlider.propTypes = {
  category: PropTypes.string,
  limit: PropTypes.number,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default NewProductSlider;
