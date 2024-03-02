import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getDesignName, getConceptName } from "../../helpers/human-string";
import Table from "react-bootstrap/Table";
const QuotationInterior = ({ itemList }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Table
      responsive
      borderless
      className="w-100 border-bottom align-items-center"
    >
      <thead>
        <tr className="w-100 row-text pt-10 pb-10 pr-20 font-12 lh-22 fw-400 text-gray text-center">
          <th className="flex-1">{t("Date")}</th>
          <th className="flex-1">{t("Sortation")}</th>
          <th className="flex-1">{t("Apartment name")}</th>
          <th className="flex-1">{t("Preferred design")}</th>
          <th className="flex-1">{t("Material grade")}</th>
          <th className="flex-1">{t("a square meter")}</th>
          <th className="flex-1">{t("Scope of construction")}</th>
          <th className="flex-1">{t("Estimated total cost")}</th>
          <th className="flex-1">{t("the first estimate")}</th>
          <th className="flex-1">{t("a final estimate")}</th>
        </tr>
      </thead>
      <tbody>
        {itemList &&
          itemList.map((item, index) => {
            return (
              <tr
                key={index}
                className="w-100 row-text pt-15 pb-15 pr-20 font-12 lh-22 fw-400 text-black_1 text-center bg-white align-items-center"
              >
                <td className="flex-1">{item.create_dt_yyyymmdd}</td>
                <td className="flex-1">{t("the entire")}</td>
                <td className="flex-1">{item.apt_name}</td>
                <td className="flex-1">{getConceptName(item.concept)}</td>
                <td className="flex-1">{getDesignName(item.grade)}</td>
                <td className="flex-1">{item.area_size}</td>
                <td className="flex-1">{item.process_name}</td>
                <td className="flex-1">
                  <div className="row-text font-12 lh-22  text-black_1 justify-content-center">
                    <div className="fw-bold">
                      {item.ext_amount?.toLocaleString("en-US")} &nbsp;
                    </div>
                    <div className="font-12 lh-22">{t("yuan")}</div>
                  </div>
                  <button
                    className="font-9 lh-16  border-gray2-1px bg-white br-3 pr-10 pl-10 text-gray_2"
                    onClick={() => {
                      navigate(`/user_interior?seq=${item.est_seq}`);
                    }}
                  >
                    {t("Quotation correction")}
                  </button>
                </td>
                <td className="flex-1">
                  <button
                    className="font-9 lh-16  border-gray2-1px bg-white br-3 pr-15 pl-15 text-gray_2"
                    onClick={() => {
                      navigate(`/interior_estimate/${item.est_seq}`);
                    }}
                  >
                    {t("View")}
                  </button>
                </td>
                <td className="flex-1">
                  <button
                    className="font-9 lh-16  border-gray2-1px bg-white br-3 pr-15 pl-15 text-gray_2"
                    onClick={() => {
                      navigate(`/interior_estimate/${item.est_seq}`);
                    }}
                  >
                    {t("Application")}
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default QuotationInterior;
