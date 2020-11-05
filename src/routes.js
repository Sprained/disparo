const express = require('express');
const multer = require('multer');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const multerConfig = require('./config/multer');

const routes = express.Router();
const upload = multer(multerConfig);

const DisparoController = require('./app/controllers/DisparoController');

const swaggerOptions = {
    definition: {
        info: {
            version: "1.0.0",
            title: "FreeLife Api",
            description: "Api para disparo de sms para pacientes",
            servers: ["http://localhost:3333"]
        }
    },
    apis: ["./src/routes.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
routes.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }))

/**
 * @swagger
 * /disparo:
 *    post:
 *      description: Disparo de sms atraves de um csv
 *      tags:
 *          - disparo
 *    cosumes:
 *      - multipart/form-data
 *    parameters:
 *      - in: formData
 *        name: file
 *        description: Arquivo csv para envio de sms
 *        required: true
 *        type: file
 *      - in: formData
 *        name: dia
 *        description: Dia de atendimento
 *        required: true
 *        type: string
 *      - in: formData
 *        name: medico
 *        description: Medico que ira realizar atendimento
 *        required: true
 *        type: string
 *      - in: formData
 *        name: especialidade
 *        description: Especialidade do medico
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: Mensagens enviada com sucesso
 */
routes.post('/disparo', upload.single('file'), DisparoController.disparo);

module.exports = routes;