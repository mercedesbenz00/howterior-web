import PropTypes from "prop-types";
import clsx from "clsx";
import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
import sliderData from "../../data/hero-sliders/hero-slider-thirty-two.json";
import HeroSliderThirtyTwoSingle from "../../components/hero-slider/HeroSliderThirtyTwoSingle.js";

const params = {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  modules: [EffectFade],
  loop: true,
  speed: 1000,
  navigation: true,
};

const HeroSliderThirtyTwo = ({
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
          <Swiper options={params} className="overflow-hidden">
            {sliderData.map((single, key) => (
              <SwiperSlide key={key}>
                <HeroSliderThirtyTwoSingle data={single} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

HeroSliderThirtyTwo.propTypes = {
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default HeroSliderThirtyTwo;
