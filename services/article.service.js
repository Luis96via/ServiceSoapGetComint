var log = require("log4js").getLogger("article.service");
const { getDbConf } = require("../utils/readerconf");
const { getArticleListToUpdateQuery, getChequeoList } = require("../utils/readerquery");
const config = getDbConf();

const pool = require("node-jt400").pool(config);

module.exports = class ArticleService {
  getArticleListToUpdate() {
    return new Promise(async (resolve, reject) => {
      try {
        const query = getArticleListToUpdateQuery();
        const results_ma = await pool.query(query);
        //log.debug("Resultado: " + results[0].ID_ACREENCIA );

      
       console.log("from acreencia");

        resolve(results_ma);
      } catch (error) {
        log.error(error);
        reject(error);
      } finally {
        await pool.close();
      }
    });
  }




//CHEQUEO TAB
  getChequeoList() {
    return new Promise(async (resolve, reject) => {
      try {
        let query = getChequeoList();
        let results = await pool.query(query);

      console.log("from chequeo");

        resolve(results);
      } catch (error) {
        log.error(error);
        reject(error);
      } finally {
        await pool.close();
      }
    });
  }







};
