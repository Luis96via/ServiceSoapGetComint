const { getList, getChequeo } = require("./controller/article.controller");
const log4js = require("log4js");
const { createFileLines } = require("./helpers/articlesToReport.format");
log4js.configure("./config/log4js.json");
const log = log4js.getLogger("index");

let begin = new Date();

function modelUno(){  


  chequeo = async() => {
    try {
      log.info("Initializing serviceSoapGetComint");
      const check = await getChequeo();
      const listMa = await getList();
      



    for (let index = 0; index < listMa.length; index++) {
        
        
         for (let indice = 0; indice < check.length; indice++) {
           
                if ( check[indice].ID_MOVIMIENTOACREENCIA == listMa[index].ID) {
                  
                  console.log( " Ya Existe este ID_MOVIMIENTO:", listMa[index].ID , " EN LA TABLA CHEQUEO");
                  console.log(" ");

                                                           } else{  
        
                                                            

                  let tipoAcreencia = listMa[index].ID_TIPOACREENCIAOPERACION;

                      //DEPOSIT
                  if( tipoAcreencia == 1 ) {
                    
                    log.info( listMa[index].ID , " NO EXISTE EN TABLA CHEQUEO.");
                  log.info( " Tipo de movimiento: ", listMa[index].ID_TIPOACREENCIAOPERACION , " ES DEPOSITO");
                  log.info(" ");
                                                                    };
                  //ANNULMENT
                  if(tipoAcreencia == 2 ) {
                    
                    log.info( listMa[index].ID , " NO EXISTE EN TABLA CHEQUEO.");
                  log.info( " Tipo de movimiento: ", listMa[index].ID_TIPOACREENCIAOPERACION , " ES ANULACIÓN");
                  log.info(" ");
                                                                    };

                  //REFUND
                  if(tipoAcreencia == '3' ) {
                    
                    log.info( listMa[index].ID , " NO EXISTE EN TABLA CHEQUEO.");
                    log.info( " Tipo de movimiento: ", listMa[index].ID_TIPOACREENCIAOPERACION , " ES REINTEGRO");
                    log.info(" ");
                  
                                                                    
                                            };


                  //CONSUMPTION
                  if(tipoAcreencia == '5' ) {
                    
                    log.info( listMa[index].ID , " NO EXISTE EN TABLA CHEQUEO.");
                    log.info( " Tipo de movimiento: ", listMa[index].ID_TIPOACREENCIAOPERACION , " ES CONSUMO");
                    log.info(" ");
                  
                                                                    
                                            };
                  
                  
                                                                  }// IF ELSE END
                
           
         }; //FOR SECOND END

        
      } //FOR FIRST END


  

      
      
      
    } catch (error) {
      log.error(error.message);
    }
  };
  
  chequeo()
    .then(async (result) => {
  
     return result;
      
    })
    .catch((err) => {
      log.err(err);
    })
    .finally(() => {
      //terminar la aplicacion ajuro porque si!!! Adios
      process.exit(1);
    });




}

 modelUno(); 





/*



updateArticle = async() => {
  try {
    log.info("Initializing serviceSoapGetComint");
    const articles = await getList();

    for (let index = 0; index < articles.length; index++) {
      
     console.log(articles);
    };
    
    
    
    let resp = await sendXmls(articles);
    log.info("process end");

    return resp;
  } catch (error) {
    log.error(error.message);
  }
};

updateArticle()
  .then(async (result) => {
    const { articlesToRetry, articlesToReport } = result;

    log.info(
      `Se procede a reenviar ${articlesToRetry.length} que fallaron por TimeOut`
    );
    try {
      let resp = await sendXmls(articlesToRetry);

      fillReport(resp, articlesToReport);

      if (articlesToReport.length > 0)
        log.debug(createFileLines(articlesToReport));

      let end = new Date();
      log.debug("Inicio del proceso: ", begin.toJSON());
      log.debug("Final  del proceso: ", end.toJSON());
    } catch (error) {
      log.error(error);
    }
  })
  .catch((err) => {
    log.err(err);
  })
  .finally(() => {
    //terminar la aplicacion ajuro porque si!!! Adios
    process.exit(1);
  });







  
function fillReport(resp, articlesToReport) {
  if (resp.articlesToReport) {
    resp.articlesToReport.forEach((element) => {
      articlesToReport.push(element);
    });
  }
  if (resp.articlesToRetry) {
    resp.articlesToRetry.forEach((element) => {
      articlesToReport.push(element);
    });
  }
}
*/