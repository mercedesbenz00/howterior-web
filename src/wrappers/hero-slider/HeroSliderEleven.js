import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
import HeroSliderElevenSingle from "../../components/hero-slider/HeroSliderElevenSingle";
import sliderData from "../../data/hero-sliders/hero-slider-eleven.json";

const params = {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  modules: [EffectFade],
  loop: true,
  speed: 1000,
  pagination: true,
  autoHeight: false,
};

const HeroSliderEleven = () => {
  return (
    <div className="slider-area">
      <div className="container">
        <div className="slider-active-3 slider-hm8">
          {sliderData && (
            <Swiper options={params}>
              {sliderData.map((single, key) => (
                <SwiperSlide key={key}>
                  <HeroSliderElevenSingle data={single} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSliderEleven;
