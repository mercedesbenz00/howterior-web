import { useTranslation } from "react-i18next";

const MaterialList = () => {
  const { t } = useTranslation();
  const list = [
    {
      date: "2023-01-28",
      number: "923042-1",
      image: "/assets/img/materials/material1.png",
      name: "벤자민무어 127bridge 타일",
      price: "10,000",
      count: 2,
      sum: "20,000",
      deliveryDate: "2023-01-28",
      status: "배송중",
    },
    {
      date: "2023-01-28",
      number: "923042-1",
      image: "/assets/img/materials/material1.png",
      name: "벤자민무어 127bridge 타일",
      price: "10,000",
      count: 2,
      sum: "20,000",
      deliveryDate: "2023-01-28",
      status: "배송중",
    },
    {
      date: "2023-01-28",
      number: "923042-1",
      image: "/assets/img/materials/material1.png",
      name: "벤자민무어 127bridge 타일",
      price: "10,000",
      count: 2,
      sum: "20,000",
      deliveryDate: "2023-01-28",
      status: "배송중",
    },
    {
      date: "2023-01-28",
      number: "923042-1",
      image: "/assets/img/materials/material1.png",
      name: "벤자민무어 127bridge 타일",
      price: "10,000",
      count: 2,
      sum: "20,000",
      deliveryDate: "2023-01-28",
      status: "배송중",
    },
  ];
  return (
    <div className="column  align-items-center">
      <div className="w-100 row-text pt-10 pb-10 pr-20 font-12 lh-22 fw-400 text-gray text-center">
        <div className="flex-1">{t("Date")}</div>
        <div className="flex-3">{t("Product name")}</div>
        <div className="flex-1">{t("Unit price by product")}</div>
        <div className="flex-1">{t("Quantity")}</div>
        <div className="flex-1">{t("a lump sum")}</div>
        <div className="flex-1">{t("Delivery date")}</div>
        <div className="flex-1">{t("State")}</div>
      </div>
      <div className="line bg-gray"></div>
      {list.map((item, index) => {
        return (
          <div key={index} className="w-100">
            <div className="w-100 row-text pt-15 pb-15 pr-20 font-12 lh-22 fw-400 text-black_1 text-center bg-white">
              <div className="flex-1 pt-10 pb-15">{item.date}</div>
              <div className="flex-3 pt-5 pb-10 lh-16 row-text justify-content-center">
                <img
                  src={process.env.PUBLIC_URL + item.image}
                  className="icon_30"
                />
                <div className="ml-10 text-align-initial">
                  <div>{item.number}</div>
                  <div>{item.name}</div>
                </div>
              </div>
              <div className="flex-1 pt-10 pb-15">{item.price}</div>
              <div className="flex-1 pt-10 pb-15">{item.count}</div>
              <div className="flex-1 pt-10 pb-15">{item.sum}</div>
              <div className="flex-1 pt-10 pb-15">{item.deliveryDate}</div>
              <div className="flex-1 pt-10 pb-15">{item.status}</div>
            </div>
            <div className="line bg-gray"></div>
          </div>
        );
      })}
    </div>
  );
};

export default MaterialList;
