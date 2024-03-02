import { useTranslation } from "react-i18next";

const VerandaExtensionStep = () => {
  const { t } = useTranslation();
  return (
    <div className="column  align-items-center">
      <h5 className="text-gray">
        {t("Please choose whether to expand the veranda.")}
      </h5>
      <div className="veranda_button mt-60">{t("Expand. (Expanded.)")}</div>
      <div className="veranda_button mt-30">{t("Do not expand.")}</div>
      <div className="veranda_button mt-30">{t("I still don't know.")}</div>
    </div>
  );
};

export default VerandaExtensionStep;
