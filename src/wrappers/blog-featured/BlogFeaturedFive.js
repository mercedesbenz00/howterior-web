import PropTypes from "prop-types";
import clsx from "clsx";
import blogFeaturedFiveData from "../../data/blog-featured/blog-featured-five.json";
import BlogFeaturedFiveSingle from "../../components/blog-featured/BlogFeaturedFiveSingle";
import SectionTitleSeven from "../../components/section-title/SectionTitleSeven";

const BlogFeaturedFive = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("blog-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        {/* section title */}
        <SectionTitleSeven
          titleText="Our Blog"
          positionClass="text-center"
          borderClass="bottom-border"
          spaceClass="mb-55"
        />
        <div className="row">
          {blogFeaturedFiveData?.map((singlePost) => (
            <div className="col-lg-4 col-sm-6" key={singlePost.id}>
              <BlogFeaturedFiveSingle singlePost={singlePost} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BlogFeaturedFive.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BlogFeaturedFive;
