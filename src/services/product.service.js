import api, { API_VERSION, axiosConfig } from "./api";

/**
 * 
 * @param {*} filterData
 * {
    "page": 1,
    "page_block": 10,
    "is_countent": "N",
    "grade": "B",
    "price_range":"1020",
    "process_seqs":[
        1
    ],
    "area_seqs":[
        78
    ],
    "cat_seqs":[
        
    ],
    "cat_val_seqs":[
        
    ]
  } 
 * @returns product list
 */
const getProductList = (filterData) => {
  return api.post(`/api/${API_VERSION}/product`, filterData, axiosConfig);
};

/**
 * @param {*} reqData 
 * {
   "product_seq": 33
  }
 * @returns 
 */
const getProductDetail = (reqData) => {
  return api
    .post(`/api/${API_VERSION}/product/read`, reqData, axiosConfig)
    .then((response) => {
      return response;
    });
};

const productService = {
  getProductList,
  getProductDetail,
};

export default productService;
