import api, { API_VERSION, axiosConfig } from "./api";

const getInteriorList = (page, pageCount) => {
  return api.post(
    "/interior/est",
    { page: page, page_block: pageCount },
    axiosConfig
  );
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
const getMyInteriorList = (filterData) => {
  return api.post(`/api/${API_VERSION}/interior/est`, filterData, axiosConfig);
};

/**
 *
 * @param {*} areaType
 * O:area_type (P:패키지, L:부분, B:욕실, J:주방, G:상품(필터링의 select로 사용), A:갤러리)
 * @returns
 */
const getAreaList = (areaType) => {
  return api.get(
    `/api/${API_VERSION}/interior/menu/area?area_type=${areaType}`
  );
};

/**
 * process_seq : 공정고유번호
 * process_name : 공정명
 * @returns 공정목록
 */
const getProcessList = () => {
  return api.get(`/api/${API_VERSION}/interior/menu/process`);
};

/**
 * -area_seq : 공간 고유번호
   -area_name : 공간명

 * @param {*} reqData request data
 * @returns area list for process
 */
const getProcessAreaJoin = (reqData) => {
  return api
    .post(
      `/api/${API_VERSION}/interior/menu/processAreaJoin`,
      reqData,
      axiosConfig
    )
    .then((response) => {
      return response;
    });
};

const saveInteriorReqeust = (reqData) => {
  return api
    .post(`/api/${API_VERSION}/interior/est/save`, reqData, axiosConfig)
    .then((response) => {
      return response;
    });
};

const updateInteriorReqeust = (reqData) => {
  return api
    .post(`/api/${API_VERSION}/interior/est/upd`, reqData, axiosConfig)
    .then((response) => {
      return response;
    });
};

const readInteriorDetail = (reqData) => {
  return api
    .post(`/api/${API_VERSION}/interior/est/read`, reqData, axiosConfig)
    .then((response) => {
      return response;
    });
};

const interiorService = {
  getInteriorList,
  getAreaList,
  getProcessList,
  getProcessAreaJoin,
  saveInteriorReqeust,
  getMyInteriorList,
  readInteriorDetail,
  updateInteriorReqeust,
};

export default interiorService;
