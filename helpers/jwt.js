var log = require("log4js").getLogger("jwt");
const jwt = require("jsonwebtoken");

const generateJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
          log.error(err);
          reject("No se puede generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
