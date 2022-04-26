const StringBuilder = require("node-stringbuilder");

module.exports = class GenerateXML {
  static create(article) {
    let xml = new StringBuilder();

    xml.appendLine(this.getHeader());
    xml.appendLine(this.getBody(article));
    xml.append(this.getFooter());

    return xml.toString().trim();
  }

  static getHeader() {
    let header = new StringBuilder();

    header.appendLine(
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://ofbiz.apache.org/service/">'
    );
    header.appendLine("<soapenv:Header/>");
    header.appendLine("<soapenv:Body>");
    header.appendLine("<ser:setAnnulmentFromLegacy>");
    //header.appendLine("<itemMaintenanceDocument>");

    return header.toString().trim();
  }

  static getBody(article) {
    let body = new StringBuilder();
    body.appendLine(
      '<![CDATA[<ItemMaintenance xmlns="http://www.nrf-arts.org/IXRetail/namespace/">'
    );
    body.appendLine(this.addBusinessUnit(article.branchOfficeName));
    body.appendLine("<Batch>");
    body.appendLine("<BatchID>4916</BatchID>");
    body.appendLine(this.addExecutionDate(new Date()));
    body.appendLine(this.itemBegin(article.discountable));
    body.appendLine(this.itemID(article.epaId));

    if (String(article.recategoryCode) != "null") {
      body.appendLine(this.addRecategoryCode(article.recategoryCode));
    } else {
      body.appendLine(this.addRecategoryCode(""));
    }

    body
      .append("<Name>")
      .append(article.shortNameArticle)
      .appendLine("</Name>");
    body
      .append("<Description>")
      .append(article.longNameArticle)
      .appendLine("</Description>");
    body.appendLine(this.addTaxRate(article.taxCode));
    body.appendLine(
      this.addCategory(
        article.codeCategory,
        article.typeCategory,
        article.nameCategory
      )
    );
    body.appendLine(
      this.addLine(article.lineCode, article.discountable, article.lineName)
    );
    if (String(article.externalCode) != "null") {
      body.appendLine(this.addExternalCode(article.externalCode));
    }
    body.appendLine(this.addCabysCode(article.cabysCode));
    body.appendLine(this.addRegularPrice(article.priceArticle));
    body.appendLine(this.addListPrice(article.priceArticle));
    body.appendLine(this.addSalesUnit(article.salesUnit));
    body.appendLine("</Item>");
    body.appendLine(
      this.addOrganizationHierarchy(
        article.branchOfficeId,
        article.branchOfficeName
      )
    );
    body.appendLine("</Batch>");
    body.appendLine("</ItemMaintenance>]]>");

    return body.toString().trim();
  }

  static getFooter() {
    let footer = new StringBuilder("");

    //footer.appendLine("</itemMaintenanceDocument>");
    footer.appendLine("</ser:setAnnulmentFromLegacy>");
    footer.appendLine("</soapenv:Body>");
    footer.appendLine("</soapenv:Envelope>");

    return footer.toString().trim();
  }
  static addOrganizationHierarchy(branchOfficeId, branchOfficeName) {
    return ` <OrganizationHierarchy Level="RetailStore" ID="${branchOfficeId}">${branchOfficeName}</OrganizationHierarchy>`;
  }
  static addSalesUnit(salesUnit) {
    return `<StockItem SalesUnit="${salesUnit}" />`;
  }

  static addListPrice(salesUnit) {
    return `<ItemPrice ValueTypeCode="UnitListPrice">${salesUnit}</ItemPrice>`;
  }

  static addRegularPrice(salesUnit) {
    return `<ItemPrice ValueTypeCode="RegularSalesUnitPrice">${salesUnit}</ItemPrice>`;
  }

  static addCabysCode(cabysCode) {
    return `<AlternativeItemID Type="CABYS">${cabysCode}</AlternativeItemID>`;
  }

  static addExternalCode(externalCode) {
    const array = externalCode.split(",");
    let codeToXml = "";
    if (array.length > 1) {
      array.forEach((code) => {
        codeToXml += `<AlternativeItemID Type="EAN13">${code}</AlternativeItemID>\n`;
      });
    } else {
      codeToXml = `<AlternativeItemID Type="EAN13">${externalCode}</AlternativeItemID>`;
    }
    return codeToXml.trim();
  }

  static addLine(code, discount, lineName) {
    return `<MerchandiseHierarchy ID="${code}" Level="Line" Active="S" AllowDiscount="${discount}">${lineName}</MerchandiseHierarchy>`;
  }

  static addCategory(code, type, categoryName) {
    return `<MerchandiseHierarchy ID="${code}" Level="Category" Type="${type}" Active="S">${categoryName}</MerchandiseHierarchy>`;
  }

  static addTaxRate(tax) {
    return `<TaxRate TaxCode="${tax}" />`;
  }

  static addBusinessUnit(branchOfficeName) {
    return `<BusinessUnit Name="${branchOfficeName}" TypeCode="RetailStore">${branchOfficeName}</BusinessUnit>`;
  }

  static addExecutionDate(date) {
    return `<ExecutionDateTime>${date
      .toJSON()
      .substring(0, 19)}</ExecutionDateTime>`;
  }

  static itemBegin(discountable) {
    let flag = "false";
    if (discountable === "S") {
      flag = "true";
    }
    return `<Item ItemCategory="Stock" Action="AddUpdate" PriceEntryRequiredFlag="false" DiscountableFlag="${flag}" PromotionableFlag="false" AuthorizedForSaleFlag="true">`;
  }

  static itemID(epaId) {
    return `<ItemID Type="ItemID">${epaId}</ItemID>`;
  }

  static addRecategoryCode(recategoryCode) {
    return `<CategorizedCode ItemCode="${recategoryCode}" />`;
  }
};
