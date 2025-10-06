import './utils/module-alias';
import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'http';
import router from './routes';

export class SetupApp{
    private server?: Server;

    constructor(private port = 3000, public app = express()){ }

    public init() : void {
        this.setupExpress();
        this.setupRoutes();
    }

    private setupExpress() : void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private setupRoutes() : void {
        this.app.use(router);
    }

    public start() : void {
        this.server = this.app.listen(this.port, () => {
            console.log(`Servidor rodando na porta ${this.port}`);
        })
    }
}