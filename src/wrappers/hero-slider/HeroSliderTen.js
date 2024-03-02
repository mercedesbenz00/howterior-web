import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
import sliderData from "../../data/hero-sliders/hero-slider-ten.json";
import HeroSliderTenSingle from "../../components/hero-slider/HeroSliderTenSingle.js";

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
  autoplay: false,
};

const HeroSliderTen = () => {
  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        <Swiper options={params}>
          {sliderData &&
            sliderData.map((single, key) => {
              return (
                <SwiperSlide key={key}>
                  <HeroSliderTenSingle data={single} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSliderTen;
