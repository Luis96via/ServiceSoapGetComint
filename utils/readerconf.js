var log = require("log4js").getLogger("readerconf");
const PropertiesReader = require("properties-reader");
//FUNCTION TO GET DB CONFIGURATION
function getDbConf() {
  properties = PropertiesReader("./public/database.properties");
  let result = ``;

  try {
    let host = properties.get("db.host");
    let user = properties.get("db.user");
    let password = properties.get("db.password");
    result = { host, user, password };
  } catch (error) {
    log.error(error);
  }
  return result;
}


//FUNCTION TO GETURLXML 
function getUrlXml() {
  properties = PropertiesReader("./public/xml.properties");
  let result = ``;
  try {
    result = properties.get("xml.url.get");
  } catch (error) {
    log.error(error);
  }
  return result;
}

//FUNCTION TO GETWSDL
function getWsdl() {
  properties = PropertiesReader("./public/xml.properties");
  let result = ``;
  try {
    result = properties.get("xml.wsdl.soapaction");
  } catch (error) {
    log.error(error);
  }
  return result;
}

//FUNCTION TO GETTIMEOUT
function getTimeOut() {
  properties = PropertiesReader("./public/xml.properties");
  let result = ``;
  try {
    result = properties.get("xml.soap.timeout");
  } catch (error) {
    log.error(error);
  }
  return result;
}

module.exports = {
  getDbConf,
  getUrlXml,
  getWsdl,
  getTimeOut,
};
