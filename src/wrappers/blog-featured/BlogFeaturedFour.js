import PropTypes from "prop-types";
import clsx from "clsx";
import blogFeaturedData from "../../data/blog-featured/blog-featured-two.json";
import BlogFeaturedSingle from "../../components/blog-featured/BlogFeaturedSingle";
import SectionTitle from "../../components/section-title/SectionTitle";

const BlogFeaturedFour = ({ spaceTopClass, spaceBottomClass }) => {
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
          {blogFeaturedData?.map((singlePost) => (
            <div className="col-lg-4 col-sm-6" key={singlePost.id}>
              <BlogFeaturedSingle singlePost={singlePost} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BlogFeaturedFour.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BlogFeaturedFour;
