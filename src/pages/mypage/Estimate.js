import { useTranslation } from "react-i18next";
import moment from "moment";
import GaussChart from "../../components/gauss-chart/GaussChart";

const Estimate = ({ itemList, ...props }) => {
  const { t } = useTranslation();

  const dateFormatConvert = (strDate) => {
    return moment(strDate, "YYYY-MM-DD").format("YYYY.MM.DD");
  };
  const GraphItem = (data) => {
    return (
      <div className="w-100">
        <div className="br-10 bg-white pb-15">
          <GaussChart score={data.avg} />
          <div className="font-12 lh-15 fw-400 text-black_1 text-center">
            Bubble {data.grade}
          </div>
        </div>
        <div className="mt-15 font-14 lh-25 text-black_1">{data.title}</div>
        <div className="row-text mt-5">
          <div className="font-10 lh-18 fw-400 text-gray_2">
            {dateFormatConvert(data.create_dt_yyyymmdd)}
          </div>
          <div className="flex-1" />
          <div className="font-10 lh-18 fw-400 text-black_1">
            {data.comp_type === "Y"
              ? t("Quotation Over")
              : t("Under Quotation")}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="d-flex flex-wrap mt-30">
      {itemList &&
        itemList.map((item, index) => {
          return (
            <div
              key={"item_" + index}
              className="flex-1 mr-25 cursor-pointer"
              style={{ minWidth: "200px", flexGrow: 0 }}
              onClick={() => {
                props.onSelect(index);
              }}
            >
              {GraphItem(item)}
            </div>
          );
        })}
    </div>
  );
};

export default Estimate;
