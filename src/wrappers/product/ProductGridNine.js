import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { getProducts } from "../../helpers/product";
import ProductGridSingleNine from "../../components/product/ProductGridSingleNine";

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

const ProductGridNine = ({
  spaceBottomClass,
  colorClass,
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
    <Swiper options={settings}>
      {prods.map((product) => {
        return (
          <SwiperSlide key={product.id}>
            <ProductGridSingleNine
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

ProductGridNine.propTypes = {
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number,
};

export default ProductGridNine;
