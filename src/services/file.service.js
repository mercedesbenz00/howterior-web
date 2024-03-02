import api from "./api";

const uploadFile = (formData) => {
  return api.post("/api/file/upload", formData).then((response) => {
    return response.data;
  });
};

const fileService = {
  uploadFile,
};

export default fileService;
