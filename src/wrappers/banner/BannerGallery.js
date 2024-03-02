import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

import RoomGridView from "../product/RoomGridView";
import roomsData from "../../data/banner/banner-rooms.json";

const BannerGallery = ({ spaceTopClass, spaceBottomClass }) => {
  const { t } = useTranslation();
  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)}>
      <div className="container container--xl">
        <h3 className="color-black3">Howterior Gallery</h3>
        <span className="banner-title">
          {t("howterior_meet_interior_part1")}
          <span className="stroke">{t("howterior_meet_interior_part2")}</span>
        </span>

        <div className="product-tab-slider-wrapper position-relative mt-130">
          <Tab.Container defaultActiveKey="bedroom">
            <div className="mb-60">
              <Nav
                variant="pills"
                className="d-flex justify-content-center text-center"
              >
                <Nav.Item className="ml-10 mr-10">
                  <Nav.Link eventKey="bedroom">Bedroom</Nav.Link>
                </Nav.Item>
                <Nav.Item className="ml-10 mr-10">
                  <Nav.Link eventKey="kitchen">Kitchen</Nav.Link>
                </Nav.Item>
                <Nav.Item className="ml-10 mr-10">
                  <Nav.Link eventKey="livingroom">Living Room</Nav.Link>
                </Nav.Item>
                <Nav.Item className="ml-10 mr-10">
                  <Nav.Link eventKey="bathroom">Bath Room</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="bedroom">
                <RoomGridView
                  items={roomsData}
                  type="bedroom"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </Tab.Pane>
              <Tab.Pane eventKey="kitchen">
                <RoomGridView
                  items={roomsData}
                  type="kitchen"
                  limit={8}
                  spaceBottomClass="mb-25"
                />
              </Tab.Pane>
              <Tab.Pane eventKey="saleItems">
                <RoomGridView
                  items={roomsData}
                  type="saleItems"
                  limit={8}
                  spaceBottomClass="mb-25"
                  sliderClassName="swiper-slide"
                />
              </Tab.Pane>
              <Tab.Pane eventKey="bathroom">
                <RoomGridView
                  items={roomsData}
                  type="bathroom"
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

BannerGallery.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BannerGallery;
