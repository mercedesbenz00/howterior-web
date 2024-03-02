import PropTypes from "prop-types";
import clsx from "clsx";
import SubscribeEmailTwo from "../../components/newsletter/SubscribeEmailTwo";

const NewsletterThree = ({
  spaceTopClass,
  spaceBottomClass,
  subscribeBtnClass,
  bgColorClass,
  subscribeColorClass,
}) => {
  return (
    <div
      className={clsx(
        "subscribe-area-3",
        bgColorClass,
        spaceTopClass,
        spaceBottomClass
      )}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-5 col-lg-7 col-md-10 mx-auto">
            <div
              className={clsx(
                "subscribe-style-3 text-center",
                subscribeColorClass
              )}
            >
              <h2>Join With Us! </h2>
              <p>Subscribe to our newsletter to receive news on update</p>
              {/* subscription form */}
              <SubscribeEmailTwo
                mailchimpUrl="//devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef"
                spaceTopClass="mt-35"
                subscribeBtnClass={subscribeBtnClass}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NewsletterThree.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  bgColorClass: PropTypes.string,
  subscribeColorClass: PropTypes.string,
};

export default NewsletterThree;
