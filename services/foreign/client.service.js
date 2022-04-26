var log = require("log4js").getLogger("client.service");
const { getList } = require("./client.controller");

const fs = require("fs");

class ClientService {
  constructor() {}

  async initValues() {
    return new Promise(async (resolve, reject) => {
      try {
        log.info("Initializing");

        resolve("ok");
      } catch (error) {
        log.info(error);
        reject(error);
      }
    });
  }
}

module.exports = {
  ClientService,
};
