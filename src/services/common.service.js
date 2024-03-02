import api, { API_VERSION, axiosConfig } from "./api";

const getCodeList = (codeType) => {
  return api
    .post(`/api/${API_VERSION}/common`, { up_code: codeType }, axiosConfig)
    .then((response) => {
      return response;
    });
};

const commonService = {
  getCodeList,
};

export default commonService;
