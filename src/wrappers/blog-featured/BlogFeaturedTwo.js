import PropTypes from "prop-types";
import clsx from "clsx";
import blogFeaturedData from "../../data/blog-featured/blog-featured.json";
import BlogFeaturedSingle from "../../components/blog-featured/BlogFeaturedSingle";
import SectionTitleTwo from "../../components/section-title/SectionTitleTwo";

const BlogFeaturedTwo = ({ spaceBottomClass }) => {
  return (
    <div className={clsx("blog-area", spaceBottomClass)}>
      <div className="container">
        <SectionTitleTwo
          titleText="OUR BLOG"
          subTitleText="Lorem ipsum dolor sit amet conse ctetu."
          positionClass="text-center"
          spaceClass="mb-55"
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

BlogFeaturedTwo.propTypes = {
  spaceBottomClass: PropTypes.string,
};

export default BlogFeaturedTwo;
