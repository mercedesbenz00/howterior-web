import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import cn from "clsx";
import { Navigation, Pagination, Autoplay, A11y, Grid } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const SwiperSlider = forwardRef(
  (
    {
      options,
      children,
      className,
      navClass,
      customLeftNavStyle,
      customRightNavStyle,
    },
    ref
  ) => {
    const modules = options?.modules !== undefined ? options.modules : [];
    const prevClass = `prev-${navClass || "swiper-nav"}`;
    const nextClass = `next-${navClass || "swiper-nav"}`;
    const sliderOptions = {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: false,
      autoplay: options?.autoplay
        ? {
            delay: 2500,
            disableOnInteraction: false,
          }
        : false,
      watchSlidesProgress: true,
      autoHeight: true,
      breakpoints: {},
      ...options,
      modules: [Navigation, Pagination, A11y, Autoplay, Grid, ...modules],
      navigation: options?.navigation
        ? {
            prevEl: `.${prevClass}`,
            nextEl: `.${nextClass}`,
          }
        : false,
      pagination: options?.pagination
        ? {
            clickable: true,
          }
        : false,
    };

    return (
      <div className={cn("swiper-wrap", className)} ref={ref}>
        <Swiper {...sliderOptions}>{children}</Swiper>

        {sliderOptions?.navigation && (
          <>
            <button
              type="button"
              style={customLeftNavStyle}
              className={`swiper-button-prev ht-swiper-button-nav carousel_round ${prevClass}`}
            >
              <img
                className="icon_20_40"
                src={process.env.PUBLIC_URL + "/assets/img/interior/left.png"}
                alt=""
              />
            </button>
            <button
              type="button"
              style={customRightNavStyle}
              className={`swiper-button-next ht-swiper-button-nav carousel_round ${nextClass}`}
            >
              <img
                className="icon_20_40"
                src={process.env.PUBLIC_URL + "/assets/img/interior/right.png"}
                alt=""
              />
            </button>
          </>
        )}
      </div>
    );
  }
);
SwiperSlider.displayName = "SwiperSlider";

export { SwiperSlide };

SwiperSlider.propTypes = {
  options: PropTypes.shape({}),
  prevIcon: PropTypes.string,
  nextIcon: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  navClass: PropTypes.string,
};

SwiperSlider.defaultProps = {
  prevIcon: "pe-7s-angle-left",
  nextIcon: "pe-7s-angle-right",
  navStyle: 1,
  dotStyle: 1,
};

export default SwiperSlider;
