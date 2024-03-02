import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import Swiper, { SwiperSlide } from "../../components/swiper";
import materialsData from "../../data/banner/banner-materials.json";

const settings = {
  loop: false,
  grabCursor: true,
  observer: true,
  observeParents: true,
  spaceBetween: 24,
  navigation: false,
  breakpoints: {
    320: {
      slidesPerView: 1.2,
    },
    576: {
      slidesPerView: 1.2,
    },
    768: {
      slidesPerView: 2.4,
    },
    1024: {
      slidesPerView: 3.4,
    },
    1200: {
      slidesPerView: 3.4,
    },
    1600: {
      slidesPerView: 4.4,
    },
    1800: {
      slidesPerView: 6.4,
    },
  },
};

const BannerMaterials = ({ spaceTopClass, spaceBottomClass }) => {
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        "banner-area bg-gray-main",
        spaceTopClass,
        spaceBottomClass
      )}
    >
      <div className="container container--xl">
        <h3 className="color-black3">Best Seller</h3>
        <span className="banner-title">
          {t("now")}
          <span className="stroke">{t("meet_popular_materials")}</span>
        </span>
      </div>
      <div className="container-fluid">
        <div className="product-tab-slider-wrapper position-relative mt-80">
          <Swiper
            className="position-static swiper--center"
            centeredSlides
            options={settings}
          >
            {materialsData &&
              materialsData.map((item) => (
                <SwiperSlide key={item.id}>
                  <img src={process.env.PUBLIC_URL + item.image} alt="" />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

BannerMaterials.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BannerMaterials;
