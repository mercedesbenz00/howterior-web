import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitleFive from "../../components/section-title/SectionTitleFive";
import ProductGridTwelve from "./ProductGridTwelve";

const TabProductTwelve = ({
  spaceTopClass,
  spaceBottomClass,
  bgColorClass,
  category,
  sectionTitle,
}) => {
  return (
    <div
      className={clsx(
        "product-area product-area--style2",
        spaceTopClass,
        spaceBottomClass,
        bgColorClass
      )}
    >
      <div className="container">
        <div className="product-tab-slider-wrapper position-relative">
          <Tab.Container defaultActiveKey="newArrival">
            <div className="product-top-bar section-border mb-60">
              <SectionTitleFive titleText={sectionTitle} />
              <Nav
                variant="pills"
                className="product-tab-list-3 bg-gray-5 text-center"
              >
                <Nav.Item>
                  <Nav.Link eventKey="newArrival">
                    <h4>New Arrivals</h4>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="bestSeller">
                    <h4>Best Sellers</h4>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="saleItems">
                    <h4>Sale Items</h4>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="newArrival">
                <ProductGridTwelve
                  category={category}
                  type="new"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </Tab.Pane>
              <Tab.Pane eventKey="bestSeller">
                <ProductGridTwelve
                  category={category}
                  type="bestSeller"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </Tab.Pane>
              <Tab.Pane eventKey="saleItems">
                <ProductGridTwelve
                  category={category}
                  type="saleItems"
                  limit={8}
                  spaceBottomClass="mb-25"
                  sliderClassName="swiper-slide"
                />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

TabProductTwelve.propTypes = {
  bgColorClass: PropTypes.string,
  category: PropTypes.string,
  sectionTitle: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default TabProductTwelve;
