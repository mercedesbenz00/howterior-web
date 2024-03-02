import { Fragment } from "react";
import SEO from "../../components/seo";
import Layout from "../../layouts/Layout";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Interior = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <SEO titleTemplate="Interior" description="Interior of howterior." />
      <Layout headerTop="visible">
        <div className="shop-area pt-80 pb-290 bg-gray-3">
          <div className="container">
            <div className="text-center ht-title">
              <h2>{t("interior_decoration")}</h2>
              {/* <div className="mt-15"></div>
              <h5 className="text-gray">
                {t("how_would_you_like_to_proceed_with_the_interior")}
              </h5> */}
            </div>
            <div className="row grid two-column text-center justify-content-center mb-10">
              {/* <div className="col-xl-5 col-sm-6 pl-15 pr-15 pt-75 pb-10">
                <h3 className="mb-40 text-gray">{t("Package_interior")}</h3>
                <div className="white_content white_content--hover column medium ht-title mb-15 d-flex align-items-center justify-content-center">
                  <Link to={process.env.PUBLIC_URL + "/expert"}>
                    <img
                      className="icon_96"
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/img/interior/achievement.png"
                      }
                      alt=""
                    />
                    <h3 className="fw-bold mt-20">
                      {t("Get_expert_recommendations")}
                    </h3>
                    <h6 className="mt-10">
                      {t(
                        "Make_it_easy_to_decorate_with_materials_recommended_by_experts_1"
                      )}
                    </h6>
                    <h6 className="">
                      {t(
                        "Make_it_easy_to_decorate_with_materials_recommended_by_experts_2"
                      )}
                    </h6>
                  </Link>
                </div>
                <div className="row ht-title pl-10 pr-10">
                  <div className="white_content white_content--hover content_row small flex-1 mr-5">
                    <img
                      className="icon_46 mr-15"
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/img/interior/kitchen.png"
                      }
                      alt=""
                    />
                    <h5 className="">{t("kitchen_interior")}</h5>
                  </div>
                  <div className="white_content white_content--hover content_row small flex-1 ml-5">
                    <img
                      className="icon_46 mr-15"
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/img/interior/bathtub.png"
                      }
                      alt=""
                    />
                    <h5 className="">{t("bathroom_interior")}</h5>
                  </div>
                </div>
              </div> */}
              <div className="pl-15 pr-15 pt-80">
                <h3 className="mb-40 text-gray">{t("partial_interior")}</h3>
              </div>

              <div className="white_content white_content--hover column large ht-title">
                <Link to={process.env.PUBLIC_URL + "/user_interior"}>
                  <img
                    className="icon_76_104"
                    src={
                      process.env.PUBLIC_URL + "/assets/img/interior/group.png"
                    }
                    alt=""
                  />
                  <h3 className="fw-bold mt-40">{t("Select_Your_Own")}</h3>
                  <h6 className="mt-10 fw-500">
                    {t(
                      "If_the_desired_construction_is_clear_such_as_wallpaper_or_flooring_choose_by_process_1"
                    )}
                  </h6>
                  <h6 className="fw-500">
                    {t(
                      "If_the_desired_construction_is_clear_such_as_wallpaper_or_flooring_choose_by_process_2"
                    )}
                  </h6>
                </Link>
              </div>
            </div>
            {/* <div className="row justify-content-center">
              <div className="row mall_content col-xl-10 col-sm-12">
                <div className="mall_text_content">
                  <h5 className="text-white">Howterior Mall</h5>
                  <h3 className="fw-bold text-white">
                    {t("Going_to_see_the_materials_of_the_house_terrier")}
                  </h3>
                  <div className="flex-1"></div>
                  <div className="d-flex justify-content-end">
                    <img
                      className="icon_36_18"
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/img/interior/arrow_right.png"
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div className="mall_background"></div>
              </div>
            </div> */}
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Interior;
