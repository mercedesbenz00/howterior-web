import PropTypes from "prop-types";
import Swiper, { SwiperSlide } from "../../components/swiper";
import BrandLogoOneSingle from "../../components/brand-logo/BrandLogoOneSingle";
import brandLogoData from "../../data/brand-logos/brand-logo-one.json";

const settings = {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  grabCursor: true,
  breakpoints: {
    320: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 4,
    },
  },
};

const BrandLogoSliderTwo = () => {
  return (
    <div className={`brand-logo-area`}>
      <div className="container">
        <div className="bg-gray-6 brand-logo-wrap">
          <div className="brand-logo-active-2">
            {brandLogoData && (
              <Swiper options={settings}>
                {brandLogoData.map((single, key) => {
                  return (
                    <SwiperSlide key={key}>
                      <BrandLogoOneSingle
                        data={single}
                        spaceBottomClass="mb-30"
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

BrandLogoSliderTwo.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BrandLogoSliderTwo;
