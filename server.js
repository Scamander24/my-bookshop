const cds = require('@sap/cds');
const log = require('cf-nodejs-logging-support');

// Configure logger for working with Express framework
log.setFramework(log.Framework.Express);

cds.on('bootstrap', (app) => {
    // add your own middleware before any by cds are added
    //log.setLoggingLevel("info");
    log.info("Prueba superada3", { prueba3: " prueba superada 3" })
    // Add the logger middleware to write access logs
    app.use(log.logNetwork);

    log.setSinkFunction((_, msg) => {
        lastMessage = msg;
        console.log(msg);
    });

    // set the logging level threshold
    log.setLoggingLevel("info");
});
