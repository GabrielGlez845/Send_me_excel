import Server from './classes/server';
import dotenv from 'dotenv';

import router from './routes/router';
// 
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';


// Rutas hijas
import users from './routes/users.routes';


import path from 'path';
// Inicializacion de variables de entorno
dotenv.config();



// BodyParser 
const server = Server.instance;

server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

server.app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

// CORS
server.app.use(cors({ origin: true, credentials: true }));

server.app.use('/', (express.static('public', { redirect: false })));



// Rutas de servicios
server.app.use('/api', router);
server.app.use('/api', users);


server.app.use('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, '../public/index.html' ));
    });

server.start(() => {
    console.log(`✅  Server online in port ${server.port}`);
});


//create   services,details 