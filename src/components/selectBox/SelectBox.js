import Select from "react-select";

const customStyles = {
  option: (defaultStyles, state) => ({
    ...defaultStyles,
    color: state.isSelected ? "#202d3e" : "#627084",
    backgroundColor: state.isSelected ? "#f9f9fb" : "#fff",
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: "1em",
    color: "#627084",
  }),
  container: (defaultStyles) => ({
    ...defaultStyles,
    borderRadius: "10px",
  }),
  control: (defaultStyles) => ({
    ...defaultStyles,
    backgroundColor: "#fff",
    padding: "0px",
    paddingLeft: "8px",
    borderRadius: "10px",
    border: "solid 1px #cbd5e1",
    minHeight: "44px",
    height: "44px",
    boxShadow: "none",
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "44px",
    padding: "0 6px",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "44px",
  }),
  // singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
};
const SelectBox = (props) => {
  return <Select styles={customStyles} {...props} />;
};
export default SelectBox;
