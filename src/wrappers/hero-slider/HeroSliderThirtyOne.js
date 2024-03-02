import PropTypes from "prop-types";
import clsx from "clsx";
import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
import sliderData from "../../data/hero-sliders/hero-slider-thirty-one.json";
import HeroSliderThirtyOneSingle from "../../components/hero-slider/HeroSliderThirtyOneSingle.js";

const params = {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  modules: [EffectFade],
  loop: true,
  speed: 1000,
  navigation: true,
  autoHeight: false,
};

const HeroSliderThirtyOne = ({
  spaceLeftClass,
  spaceRightClass,
  spaceBottomClass,
}) => {
  return (
    <div
      className={clsx(
        "slider-area",
        spaceLeftClass,
        spaceRightClass,
        spaceBottomClass
      )}
    >
      <div className="slider-active nav-style-3 nav-style-3--blue">
        {sliderData && (
          <Swiper options={params}>
            {sliderData.map((single, key) => (
              <SwiperSlide key={key}>
                <HeroSliderThirtyOneSingle data={single} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

HeroSliderThirtyOne.propTypes = {
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default HeroSliderThirtyOne;
