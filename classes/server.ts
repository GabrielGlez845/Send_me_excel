
import express from 'express';
import { SERVER_PORT } from '../global/environment';
import http from 'http';
import socketIO from 'socket.io';
import * as socket from '../classes/listeners';

import sequelize from '../database/database';
import { createAssosiations } from '../database/assosiations';

export default class Server {

    private static _intance: Server;

    public app: express.Application;
    public port: number;

    private httpServer: http.Server;
    public io: socketIO.Server;


    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = require('socket.io')(this.httpServer,  { 
            cors: { 
                origin: true,
                methods: ['GET', 'POST','PUT','DELETE'],
                credentials: true,
            }
        });

        // this.mysqlConnect();
        this.socketListen();
    }

    public static get instance() {
        return this._intance || (this._intance = new this());
    }

    private socketListen() {
        console.log('✅  Socket server online');

        this.io.on('connection', cliente => {
            socket.connectClient(cliente, this.io);
            // socket.disconnectClient(cliente, this.io);
        });
    }

    public start(callback: () => void) {
        this.httpServer.listen(this.port, callback);
    }

}