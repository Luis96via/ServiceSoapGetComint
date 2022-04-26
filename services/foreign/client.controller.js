var log = require("log4js").getLogger("client.controller");
const axios = require("axios");

const getList = async (uri) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await axios.get(uri);
      resolve(resp);
    } catch (error) {
      log.error(error);
      reject(error);
    }
  });
};

const sendPostRequest = async (uri, newPost) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await axios.post(uri, newPost);
      log.info(resp.data);
      resolve(resp);
    } catch (err) {
      reject(err.response.data);
    }
  });
};

module.exports = {
  getList,
  sendPostRequest,
};
