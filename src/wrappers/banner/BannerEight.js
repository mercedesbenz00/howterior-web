import bannerData from "../../data/banner/banner-eight.json";
import BannerEightSingle from "../../components/banner/BannerEightSingle.js";

const BannerEight = () => {
  return (
    <div className="col-lg-4 col-md-12">
      <div className="row">
        {bannerData?.map((single, key) => (
          <div className="col-lg-12 col-md-6 col-sm-6" key={key}>
            <BannerEightSingle data={single} spaceBottomClass="mb-30" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerEight;
