export const getDesignName = (key) => {
  let ret = "Basic";
  if (key === "S") {
    ret = "Special";
  } else if (key === "P") {
    ret = "Premium";
  }

  return ret;
};

export const getConceptName = (key) => {
  let ret = "Clean";
  if (key === "CO") {
    ret = "Comfortable";
  } else if (key === "LG") {
    ret = "Light";
  }

  return ret;
};
