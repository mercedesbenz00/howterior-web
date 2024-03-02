const Checkbox = ({
  id,
  label,
  checked,
  onChange,
  labelClassName,
  lightMode = false,
  round = false,
  showBase = false,
  grayBorder = false,
  size = "sm",
  ...props
}) => {
  return (
    <div
      className={`checkbox-wrapper checkbox--${size} position-relative ${
        round ? "checkbox--round" : ""
      } ${grayBorder ? "checkbox--gray-border" : ""} ${
        lightMode ? "checkbox--light" : ""
      }`}
    >
      {showBase && (
        <div
          className={`base position-absolute ${
            checked ? "bg-main-black" : "bg-white"
          }`}
        ></div>
      )}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <label className={labelClassName} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
export default Checkbox;
