import { useTranslation } from "react-i18next";
import Swiper, { SwiperSlide } from "../../../components/swiper";

const settings = {
  loop: false,
  grabCursor: true,
  observer: true,
  observeParents: true,
  spaceBetween: 24,
  navigation: true,
  breakpoints: {
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
};

const designList = [
  { name: "Clean", image: "/assets/img/api/expert/design_clean.png" },
  {
    name: "Comfortable",
    image: "/assets/img/api/expert/design_comfortable.png",
  },
  { name: "Light", image: "/assets/img/api/expert/design_light.png" },
  {
    name: "Comfortable",
    image: "/assets/img/api/expert/design_comfortable.png",
  },
  { name: "Light", image: "/assets/img/api/expert/design_light.png" },
];

const DesignSelectionStep = () => {
  const { t } = useTranslation();
  const chevronWidth = 72;
  return (
    <div>
      <h5 className="text-gray">
        {t(
          "Please choose a design that you like. I'll decorate the selected space beautifully."
        )}
      </h5>
      <div className="row justify-content-center mt-60">
        <div
          style={{
            padding: `0 ${chevronWidth}px`,
          }}
        >
          <div className="position-relative mt-80">
            <Swiper
              className="position-static swiper--center"
              customLeftNavStyle={{ marginTop: "-48px" }}
              customRightNavStyle={{ marginTop: "-48px" }}
              centeredSlides
              options={settings}
            >
              {designList &&
                designList.map((item, index) => (
                  <SwiperSlide key={"design_" + index}>
                    <div key={index}>
                      <img
                        className="icon_300"
                        src={process.env.PUBLIC_URL + item.image}
                        alt=""
                      />
                      <div className="mt-10"></div>
                      <h5>{item.name}</h5>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSelectionStep;
