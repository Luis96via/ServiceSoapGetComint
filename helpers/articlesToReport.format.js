const StringBuilder = require("node-stringbuilder");

const createFileLines = (articles) => {
  const today = new Date();
  let file = new StringBuilder();
  file.appendLine("-------Articulos pendientes por enviar-------");
  file.appendLine(`Fecha: ${today.toJSON()}`);

  for (let [item, element] of articles.entries()) {
    file.appendLine(
      `${item + 1} · Articulo ${
        element["CODIGO_EPA"]
      } - tienda : ${getStoreNumber(element["SUCURSAL"])} :: motivo : ${
        element.status
      }`
    );
  }

  return file.toString().trim();
};

const getStoreNumber = (name) => {
  return name.substring(5, 6);
};

module.exports = {
  createFileLines,
};
