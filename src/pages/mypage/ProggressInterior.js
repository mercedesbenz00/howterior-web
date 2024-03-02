import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

import { getDesignName, getConceptName } from "../../helpers/human-string";

const ProggressInterior = ({ itemList }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="w-100 column align-items-center">
      <Table responsive borderless className="border-bottom">
        <thead>
          <tr className="w-100 row-text pt-10 pb-10 pr-20 font-12 lh-22 fw-400 text-gray text-center">
            <th className="flex-1">{t("Date")}</th>
            <th className="flex-1">{t("Sortation")}</th>
            <th className="flex-1">{t("Apartment name")}</th>
            <th className="flex-1">{t("Preferred design")}</th>
            <th className="flex-1">{t("Material grade")}</th>
            <th className="flex-1">{t("a square meter")}</th>
            <th className="flex-1">{t("Scope of construction")}</th>
            <th className="flex-1">{t("Restarting")}</th>
          </tr>
        </thead>
        <tbody>
          {itemList &&
            itemList.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="w-100 row-text pt-25 pb-30 pr-20 font-12 lh-22 fw-400 text-black_1 text-center bg-white"
                >
                  <td className="flex-1">{item.create_dt_yyyymmdd}</td>
                  <td className="flex-1">{t("the entire")}</td>
                  <td className="flex-1">{item.apt_name}</td>
                  <td className="flex-1">{getConceptName(item.concept)}</td>
                  <td className="flex-1">{getDesignName(item.grade)}</td>
                  <td className="flex-1">{item.area_size}</td>
                  <td className="flex-1">{item.process_name}</td>
                  <td className="flex-1">
                    <button
                      className="font-9 lh-16  border-gray2-1px bg-white br-3 pr-15 pl-15 text-gray_2"
                      onClick={() => {
                        navigate(`/user_interior?seq=${item.est_seq}`);
                      }}
                    >
                      {t("Restarting")}
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div className="mt-40 font-10 lh-15 text-gray_2">
        {t("Find my new style.")}
      </div>
      <button className="mt-15 bg-black text-white font-14 lh-25 pr-35 pl-35 pt-10 pb-10 br-10 border-0px">
        {t("interior_decoration")}
      </button>
    </div>
  );
};

export default ProggressInterior;
