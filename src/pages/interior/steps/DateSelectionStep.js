import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

import { localSaveInteriorReqeust } from "../../../store/slices/interior-slice";

const DateSelectionStep = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { interiorRequest } = useSelector((state) => state.interior);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (interiorRequest && interiorRequest.mk_dt) {
      setDate(moment(interiorRequest.mk_dt, "YYYYMMDD").toDate());
    } else {
      onSelectDate(new Date());
    }
  }, []);

  const onSelectDate = (dateVal) => {
    setDate(dateVal);
    dispatch(
      localSaveInteriorReqeust({
        ...interiorRequest,
        mk_dt: moment(dateVal).format("YYYYMMDD"),
      })
    );
  };
  return (
    <div className="column align-items-center">
      <h5 className="text-gray">
        {t("When is the desired construction date?")}
      </h5>
      <div className="mt-60 w-100 d-flex allign-items-center justify-content-center">
        <Calendar
          onChange={onSelectDate}
          value={date}
          minDate={new Date()}
          locale="ko-KR"
          selectRange={false}
          formatDay={(_, date) => dayjs(date).format("DD")}
          prevLabel={
            <img
              className="icon_5_11"
              src={process.env.PUBLIC_URL + "/assets/img/interior/cal_left.png"}
            />
          }
          nextLabel={
            <img
              className="icon_5_11"
              src={
                process.env.PUBLIC_URL + "/assets/img/interior/cal_right.png"
              }
            />
          }
          prev2Label={null}
          next2Label={null}
        />
      </div>
    </div>
  );
};

export default DateSelectionStep;
