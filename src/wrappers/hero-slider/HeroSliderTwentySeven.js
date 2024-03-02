import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
import HeroSliderTwentySevenSingle from "../../components/hero-slider/HeroSliderTwentySevenSingle.js";
import sliderData from "../../data/hero-sliders/hero-slider-twenty-seven.json";

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

const HeroSliderTwentySeven = () => {
  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        {sliderData && (
          <Swiper options={params}>
            {sliderData?.map((single, key) => (
              <SwiperSlide key={key}>
                <HeroSliderTwentySevenSingle data={single} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default HeroSliderTwentySeven;
