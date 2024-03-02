import PropTypes from "prop-types";
import clsx from "clsx";
import blogFeaturedThreeData from "../../data/blog-featured/blog-featured.json";
import BlogFeaturedThreeSingle from "../../components/blog-featured/BlogFeaturedThreeSingle";
import SectionTitle from "../../components/section-title/SectionTitle";

const BlogFeaturedThree = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("blog-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <SectionTitle
          titleText="Latest News"
          subtitleText="But I must explain to you how all this mistaken idea of denouncing."
          positionClass="text-center"
          spaceClass="mb-55"
          borderClass="no-border"
        />
        <div className="row">
          {blogFeaturedThreeData?.map((singlePost) => (
            <div className="col-lg-4 col-sm-6" key={singlePost.id}>
              <BlogFeaturedThreeSingle singlePost={singlePost} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BlogFeaturedThree.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BlogFeaturedThree;
