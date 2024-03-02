import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
import sliderData from "../../data/hero-sliders/hero-slider-twelve.json";
import HeroSliderTwelveSingle from "../../components/hero-slider/HeroSliderTwelveSingle.js";

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

const HeroSliderTwelve = () => {
  return (
    <div className="slider-area">
      <div className="slider-active-2 nav-style-2">
        <Swiper options={params}>
          {sliderData?.map((single, key) => (
            <SwiperSlide key={key}>
              <HeroSliderTwelveSingle data={single} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSliderTwelve;
