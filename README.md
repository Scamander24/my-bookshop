# Proyecto CAP con Integración de Librería Personalizada para Logging

Este proyecto **CAP (Cloud Application Programming)** en **SAP Cloud Foundry** utiliza la librería `cf-nodejs-logging-support` para gestionar el tráfico de red y registrar logs automáticamente en la aplicación **Express**.

## Características Principales

1. **Middleware de Logging**: La librería personalizada registra todas las solicitudes HTTP, facilitando la depuración y monitoreo de la aplicación.
2. **Mensajes de Log Personalizados**: Permite registrar mensajes con niveles de severidad como `info`, `warn` y `error`.
3. **Configuración Flexible de Logs**: Establece cómo y dónde se muestran los logs, permitiendo una depuración en tiempo real sin saturar los registros.

## Código de Integración en `server.js`

```javascript
const cds = require('@sap/cds');
const log = require('cf-nodejs-logging-support');

// Configurar logging para Express
log.setFramework(log.Framework.Express);

cds.on('bootstrap', (app) => {
    app.use(log.logNetwork);  // Middleware para registrar tráfico HTTP

    log.setSinkFunction((_, msg) => console.log(msg));  // Manejo personalizado de logs
    log.setLoggingLevel("info");  // Nivel de logging configurado en 'info'
});
```

## Explicación del Evento `cds.on('bootstrap')`

El evento `cds.on('bootstrap')` te permite añadir middleware o lógica personalizada antes de que CAP procese cualquier solicitud. Es ideal para configuraciones tempranas, como la gestión de sesiones, autenticación o el manejo de archivos estáticos.

---

## Ejemplo de Implementación de Logging en un Servicio CAP

El siguiente código muestra cómo integrar el sistema de logging en un servicio que se conecta al servicio OData **NorthWind**. En cada lectura de la entidad **Products**, se genera un log estructurado con detalles de la operación y el usuario.

### Código de Ejemplo

```javascript
const cds = require('@sap/cds');
const log = require('cf-nodejs-logging-support');

module.exports = cds.service.impl(async function () {
    const { Products } = this.entities;
    const service = await cds.connect.to('NorthWind');

    this.on('READ', Products, request => {
        const dataLog = logJson("Lectura de productos", "Manel", 5);
        log.info("Mensaje desde la librería personalizada", dataLog);

        return service.tx(request).run(request.query);  // Realiza la lectura desde NorthWind
    });
});

// Función para generar datos de log personalizados
function logJson(operation, currentUser, priorityLevel) {
    return { operation, currentUser, priorityLevel };
}
```