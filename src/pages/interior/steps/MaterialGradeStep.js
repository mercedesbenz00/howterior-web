import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { localSaveInteriorReqeust } from "../../../store/slices/interior-slice";

const MaterialGradeStep = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { interiorRequest } = useSelector((state) => state.interior);

  const material_degree = [
    {
      image: "/assets/img/interior/material_basic.png",
      text: [
        t("We carefully selected materials that are commonly used."),
        t("Don't miss out on the Hautrier's special offer!"),
      ],
      grade: "B",
    },
    {
      image: "/assets/img/interior/material_specialty.png",
      text: [t("Luxury starts with the details."), t("Feel the details!")],
      grade: "S",
    },
    {
      image: "/assets/img/interior/material_premium.png",
      text: [
        t("A special experience with the finest materials."),
        t("Experience a selection of super-luxury materials!"),
      ],
      grade: "P",
    },
  ];

  const onSelectGrade = (gradeItem) => {
    dispatch(
      localSaveInteriorReqeust({ ...interiorRequest, grade: gradeItem.grade })
    );
  };

  return (
    <div>
      <h5 className="text-gray">{t("Please select a material grade.")}</h5>
      <div className="d-flex flex-wrap justify-content-center text-center mt-60 gap-50">
        {material_degree.map((item, index) => {
          return (
            <div
              key={index}
              className="material_degree_item"
              onClick={() => {
                onSelectGrade(item);
              }}
            >
              <img
                className={`icon_300 ${
                  interiorRequest.grade === item.grade ? "selected-card" : ""
                }`}
                src={process.env.PUBLIC_URL + item.image}
                alt=""
              />
              <div className="mt-20"></div>
              <h6 className="color-black4">{item.text[0]}</h6>
              <h6 className="color-black4">{item.text[1]}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MaterialGradeStep;
