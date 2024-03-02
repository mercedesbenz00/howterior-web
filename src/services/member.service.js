import api, { API_VERSION, axiosConfig } from "./api";

/**
 * Format {
    "column_name": "id",
    "column_value":"????@gmail.com"
  }
 * @param {*} reqData 
 * @returns 
 */
const checkMember = (reqData) => {
  return api
    .post(`/api/${API_VERSION}/member/chk`, reqData, axiosConfig)
    .then((response) => {
      return response;
    });
};

/**
 * Format {
    "phone": "?????"
  }
 * @param {*} reqData 
 * @returns 
 */
const findMemberId = (reqData) => {
  return api
    .post(`/api/${API_VERSION}/member/search/id`, reqData, axiosConfig)
    .then((response) => {
      return response;
    });
};

/**
 * Format {
    "id": "????@gmail.com",
    "phone": "?????"
  }
 * @param {*} reqData 
 * @returns 
 */
const findPasswordKey = (reqData) => {
  return api
    .post(`/api/${API_VERSION}/member/search/pw`, reqData, axiosConfig)
    .then((response) => {
      return response;
    });
};

/**
 * Format {
    "change_pw_key": "????",
    "pw": "?????"
  }
 * @param {*} reqData 
 * @returns 
 */
const changePassword = (reqData) => {
  return api
    .post(`/api/${API_VERSION}/member/change/pw`, reqData, axiosConfig)
    .then((response) => {
      return response;
    });
};

/**
 * @returns my info
 */
const getMyProfile = () => {
  return api.get(`/api/${API_VERSION}/member/info`);
};

/**
 * Format {
    "name": "????",
    "nickname": "?????"
  }
 * @param {*} reqData 
 * @returns 
 */
const changeMyProfile = (reqData) => {
  return api
    .post(`/api/${API_VERSION}/member/change`, reqData, axiosConfig)
    .then((response) => {
      return response;
    });
};

const memberService = {
  changePassword,
  checkMember,
  findMemberId,
  findPasswordKey,
  getMyProfile,
  changeMyProfile,
};

export default memberService;
