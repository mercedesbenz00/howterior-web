import api, { API_VERSION, axiosConfig } from "./api";

const getBubbleProcessList = () => {
  return api.get(`/api/${API_VERSION}/interior/cat/bub`);
};

/**
 * 
 * @param {
 * } filterData 
 * {
    "page":1,
    "page_block":10
   }
 * @returns my bubble list
 */
const getMyBubbleList = (filterData) => {
  return api.post(`/api/${API_VERSION}/interior/bub`, filterData, axiosConfig);
};

const saveBubbleQuote = (reqData) => {
  return api
    .post(`/api/${API_VERSION}/interior/bub/save`, reqData, axiosConfig)
    .then((response) => {
      return response;
    });
};

const saveBubbleChk = (seqId) => {
  return api
    .post(
      `/api/${API_VERSION}/interior/bub/member/upd`,
      { bub_seq: seqId },
      axiosConfig
    )
    .then((response) => {
      return response;
    });
};

/**
 * Format {
   "bub_seq": 33
  }
 * @param {*} reqData 
 * @returns 
 */
const getBubbleQuoteCheckResult = (reqData) => {
  return api
    .post(`/api/${API_VERSION}/interior/bub/chk`, reqData, axiosConfig)
    .then((response) => {
      return response;
    });
};

const bubbleService = {
  getBubbleProcessList,
  saveBubbleQuote,
  saveBubbleChk,
  getBubbleQuoteCheckResult,
  getMyBubbleList,
};

export default bubbleService;
