const cds = require('@sap/cds');
const log = require('cf-nodejs-logging-support');

module.exports = cds.service.impl(async function () {
	const { Products } = this.entities;
	const service = await cds.connect.to('NorthWind');
	dataLog = logJson("Lectura de productos", "Manel", 5)
	this.on('READ', Products, request => {
		log.info("Esto es un mensaje desde la libreria personalizada", dataLog)
		return service.tx(request).run(request.query);
	});
});

function logJson(operation, currentUser, priorityLevel) {
    return { operation, currentUser, priorityLevel };
}