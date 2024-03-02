import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const HomeSliderMainSingle = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div
      className="single-slider-2 slider-height-2 d-flex bg-img"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL + data.image})` }}
    >
      <div className="container mt-150">
        <div className="row">
          <div className="col-12 ms-auto">
            <div className="slider-content-2 slider-content-2--white slider-animated-1 text-center mt-16">
              <h1 className="animated no-style">{t(data.title)}</h1>
              <h1 className="animated no-style">{t(data.subtitle)}</h1>
              <h3
                className="animated no-style"
                dangerouslySetInnerHTML={{ __html: t(data.desc) }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HomeSliderMainSingle.propTypes = {
  data: PropTypes.shape({}),
};

export default HomeSliderMainSingle;
