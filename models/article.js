module.exports = class Article {
  constructor(article) {
    this.branchOfficeId = this.extractBranchOfficeId(article["SUCURSAL"]);
    this.branchOfficeName = article["SUCURSAL"];
    this.executionDateTime = this.updateDate();
    this.lineCode = article["CODIGO_LINEA"];
    this.lineName = article["NOMBRE_LINEA"];
    this.statusCategory = article["ESTADO_CATEGORIA"];
    this.codeCategory = article["CODIGO_CATEGORIA"];
    this.nameCategory = article["NOMBRE_CATEGORIA"];
    this.typeCategory = article["TIPO_CATEGORIA"];
    this.epaId = article["CODIGO_EPA"];
    this.shortNameArticle = article["DESCRIP_CORTA"];
    this.longNameArticle = article["DESCRIP_LARGA"];
    this.discountable = article["PERMITE_REBAJA"];
    this.priceArticle = article["PRECIO_REGULAR"];
    this.taxCode = article["COMMODITYCODE"];
    this.externalCode = article["CODIGO_EXTERNO"];
    this.recategoryCode = article["CODIGO_CATEGORIZADO"];
    this.cabysCode = article["CODIGO_CABYS"];
    this.salesUnit = article["UNIDAD_VENTA"];
  }

  extractBranchOfficeId(nameBranch) {
    return nameBranch.substring(5, 6);
  }

  updateDate() {
    let d = new Date();
    return d.toJSON().substring(0, 19);
  }
};
