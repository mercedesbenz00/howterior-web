import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BlogFeaturedFiveSingle = ({ singlePost }) => {
  return (
    <div className="blog-wrap-3 mb-30 scroll-zoom">
      <div className="blog-img mb-30">
        <Link to={process.env.PUBLIC_URL + singlePost.url}>
          <img src={process.env.PUBLIC_URL + singlePost.image} alt="" />
        </Link>
      </div>
      <div className="blog-content-wrap">
        <div className="blog-category-names blog-category-names--style2">
          {singlePost.category.map((singleCategory, key) => {
            return (
              <span className="red" key={key}>
                {(key ? ", " : "") + singleCategory}
              </span>
            );
          })}
        </div>
        <div className="blog-content">
          <h3>
            <Link to={process.env.PUBLIC_URL + singlePost.url}>
              {singlePost.title}
            </Link>
          </h3>
          <span>
            <Link to={process.env.PUBLIC_URL + singlePost.url}>Read More</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

BlogFeaturedFiveSingle.propTypes = {
  singlePost: PropTypes.shape({}),
};

export default BlogFeaturedFiveSingle;
