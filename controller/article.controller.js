var parser = require("xml2json");
var log = require("log4js").getLogger("article.controller");
const soapRequest = require("easy-soap-request");
const ArticleService = require("../services/article.service");
const GenerateXML = require("../helpers/generateXml");
const Article = require("../models/article");

const { getUrlXml, getWsdl, getTimeOut } = require("../utils/readerconf");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const sampleHeaders = {
  "user-agent": "sampleTest",
  "Content-Type": "text/xml;charset=UTF-8",
  soapAction: getWsdl(),
};

const conection = new ArticleService();

//MOVIENTOACREENCIA DATA

const getList = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      log.debug("Iniciando busqueda en base de datos");
      let answer_ma = await conection.getArticleListToUpdate();
      resolve(answer_ma);
    } catch (err) {
      log.error(err.message);
      reject(err);
    }
  });
};


//CHEQUEO DATA
const getChequeo = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      log.debug("Iniciando busqueda en base de datos");
      let answer_check = await conection.getChequeoList();
      resolve(answer_check);
    } catch (err) {
      log.error(err.message);
      reject(err);
    }
  });
};




const sendXmls = async (articles) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = 1;
      let articlesToRetry = [];
      let articlesToReport = [];
      for (let articleJson of articles) {
        const article = new Article(articleJson);

        try {
          const { response } = await soapRequest({
            url: getUrlXml(),
            headers: sampleHeaders,
            xml: GenerateXML.create(article),
            timeout: getTimeOut() || 10000,
          });

          log.debug(
            `${count} . Article ${article.epaId}- ${
              article.branchOfficeId
            } :: response: ${getResponseMessage(response["body"])}`
          );
          if (!getResponseMessage(response["body"]).includes("success")) {
            articleJson["status"] = getResponseMessage(response["body"]);
            articlesToReport.push(articleJson);
          }
        } catch (error) {
          if (error.code == "ECONNABORTED") {
            articleJson["status"] = error.message;
            articlesToRetry.push(articleJson);
          }

          log.error(
            `${count} . Article ${article.epaId}- ${article.branchOfficeId} :: response: ${error.message}`
          );
        }

        count++;
      }
      resolve({ articlesToRetry, articlesToReport });
    } catch (error) {
      reject(error);
    }
  });
};

const getResponseMessage = (xml) => {
  try {
    const json = parser.toJson(xml);
    let jsonData = JSON.parse(json);
    jsonData = jsonData["soapenv:Envelope"];
    jsonData = jsonData["soapenv:Body"];
    jsonData = jsonData["ns1:itemMaintenanceServiceRequestResponse"];
    jsonData = jsonData["itemMaintenanceServiceResponse"];
    jsonData = jsonData["$t"];
    return JSON.stringify(jsonData);
  } catch (error) {
    return xml;
  }
};

module.exports = {
  getList,
  sendXmls,
  getChequeo,
};
