var log = require('log4js').getLogger("readerquery");
const PropertiesReader = require("properties-reader");

function getArticleListToUpdateQuery() {
  let properties = PropertiesReader('./public/query.properties');
    let result = ``;
    try {
        result = properties.get("query.article.get.list");
    } catch (error) {
      log.error(error);
    }
    return result;
  }




  function getChequeoList() {
    let chequeoProperties = PropertiesReader('./public/query.properties');
    let chequeoResult = ``;
    try {
      chequeoResult = chequeoProperties.get("query.chequeo.get.list");
    } catch (error) {
      log.error(error);
    }
    return chequeoResult;
  }

  module.exports = {
    getArticleListToUpdateQuery,
    getChequeoList
    }