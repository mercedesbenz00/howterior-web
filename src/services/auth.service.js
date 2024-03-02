import api, { API_VERSION, axiosConfig } from "./api";
import TokenService from "./token.service";

const register = (joinData) => {
  return api
    .post(`/api/${API_VERSION}/join`, joinData, axiosConfig)
    .then((response) => {
      if (response.data && response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.errMsg);
      }
    });
};

const login = (username, password) => {
  return api
    .post(
      `/api/${API_VERSION}/login`,
      {
        id: username,
        pw: password,
      },
      axiosConfig
    )
    .then((response) => {
      if (response.data && response.data.success) {
        TokenService.setUser(response.data.data);
      } else {
        throw new Error(response.data.errMsg);
      }

      return response.data;
    });
};

const socialLogin = (platform) => {
  return api.get(`/api/${platform}`, axiosConfig);
};

const sendSMS = (phone) => {
  return api
    .post(
      `/api/${API_VERSION}/send/sms`,
      {
        phone: phone,
        type: "AUTH",
      },
      axiosConfig
    )
    .then((response) => {
      if (response.data && response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.errMsg);
      }
    });
};

const logout = () => {
  TokenService.removeUser();
};

const authService = {
  register,
  login,
  logout,
  socialLogin,
  sendSMS,
};

export default authService;
