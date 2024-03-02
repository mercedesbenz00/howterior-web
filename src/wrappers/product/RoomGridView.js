import PropTypes from "prop-types";
import Swiper, { SwiperSlide } from "../../components/swiper";

const settings = {
  loop: false,
  grabCursor: true,
  observer: true,
  observeParents: true,
  spaceBetween: 24,
  navigation: false,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
    1480: {
      slidesPerView: 6,
    },
  },
};

const settingsBig = {
  loop: false,
  grabCursor: true,
  observer: true,
  observeParents: true,
  spaceBetween: 24,
  navigation: true,
  slidesPerView: 1,
};

const RoomGridView = ({ items }) => {
  if (!items?.length) return <p>No items found</p>;

  return (
    <div>
      <Swiper
        className="position-static swiper--center mb-20"
        centeredSlides
        options={settingsBig}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <img src={process.env.PUBLIC_URL + item.big_image} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        className="position-static swiper--center"
        centeredSlides
        options={settings}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <img src={process.env.PUBLIC_URL + item.small_image} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

RoomGridView.propTypes = {
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  titlePriceClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number,
  items: PropTypes.array,
};

export default RoomGridView;
