import React, { Fragment } from "react";
import SEO from "../../components/seo";
import Layout from "../../layouts/Layout";
import HomeMainSlider from "../../wrappers/hero-slider/HomeMainSlider";
import BannerSolution from "../../wrappers/banner/BannerSolution";
import BannerProcess from "../../wrappers/banner/BannerProcess";
import BannerGallery from "../../wrappers/banner/BannerGallery";
import BannerMaterials from "../../wrappers/banner/BannerMaterials";

const Home = () => {
  return (
    <Fragment>
      <SEO titleTemplate="Howterior Home" description="Howterior Home." />
      <Layout headerTop="visible">
        {/* hero slider */}
        <HomeMainSlider />
        {/* solution */}
        <div className="d-flex column align-items-center">
          <div className=" col-xl-10">
            <BannerSolution spaceTopClass="pt-100" spaceBottomClass="pb-170" />
          </div>
        </div>
        {/* process */}
        <BannerProcess spaceTopClass="pt-100" spaceBottomClass="pb-70" />
        {/* gallery */}
        <BannerGallery spaceTopClass="pt-100" spaceBottomClass="pb-70" />
        {/* gallery */}

        <BannerMaterials spaceTopClass="pt-100" spaceBottomClass="pb-180" />
      </Layout>
    </Fragment>
  );
};

export default Home;
