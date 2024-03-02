import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

// import SelectBox from "../../../components/selectBox/SelectBox";
import { setCart, deleteFromCart } from "../../../store/slices/product-slice";

const FinalCheckStep = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { interiorRequest } = useSelector((state) => state.interior);
  const { cartInfoList } = useSelector((state) => state.product);
  return (
    <div className="column  align-items-center">
      <h5 className="text-gray">{t("Check out the final selection.")}</h5>
      <div className="mt-20 row-text">
        <h5 className="row-text font-18 text-black_1">
          {t("Total Space Area")}
        </h5>
        <h3 className="font-24 text-black_1 mr-5 ml-5">
          {interiorRequest?.area_size || 0}
        </h3>
        <h5>{t("pyeong.")}</h5>
      </div>
      {/* <SelectBox
        className="mt-15"
        placeholder={t("bubble_input_dialog_text5")}
        options={options}
        name={"name"}
        value={"value"}
        onChange={() => {}}
        ref={null}
      /> */}
      <div className="font-12 white_content col-xl-8 col-sm-10 column mt-15 pt-30 pb-30 pr-40 pl-40">
        <div className="line bg-gray"></div>
        <div className="w-100 row bg-gray-1 pt-10 pb-10 pr-55">
          <div className="flex-1 text-gray">{t("process")}</div>
          <div className="flex-1 text-gray">{t("Space")}</div>
          <div className="flex-3 text-gray">{t("Material")}</div>
        </div>
        <div className="line bg-gray"></div>
        {cartInfoList.map((item, index) => {
          return item.areaList.map((areaItem, areaIndex) => {
            return (
              <div key={`${index}_${areaIndex}`} className="w-100">
                <div className="row pt-20 pb-25 mr-0 ml-0 align-items-center pr-35">
                  <div className="flex-1 text-gray_2">{item.process_name}</div>
                  <div className="flex-1 text-gray_2">{areaItem.area_name}</div>
                  <div className="flex-3 align-items-center text-gray_2 row-text mr-0 ml-0">
                    <img className="icon_28" src={areaItem.product?.file_url} />
                    <div className="ml-10 column lh-16 text-align-initial">
                      <div>{areaItem.product?.product_code}</div>
                      <div>{areaItem.product?.product_name}</div>
                    </div>
                    <div className="flex-1" />
                    <img
                      className="icon_20 cursor-pointer"
                      onClick={() => {
                        if (item.areaList.length === 1) {
                          dispatch(deleteFromCart(item.cartSeq));
                        } else {
                          let newCartInfoList = JSON.parse(
                            JSON.stringify(cartInfoList)
                          );
                          newCartInfoList[index].areaList.splice(areaIndex, 1);
                          dispatch(setCart(newCartInfoList));
                        }
                      }}
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/img/interior/close.png"
                      }
                    />
                  </div>
                </div>
                <div className="line bg-gray"></div>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default FinalCheckStep;
