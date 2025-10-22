import './utils/module-alias';
import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'http';
import router from '@routes/routes'

export class SetupApp{
    private server?: Server;

    constructor(
        private port = process.env.PORT, 
        public app = express()
    ){ }

    public init() : void {
        this.setupExpress();
        this.setupRoutes();
        this.setupMiddlewares();
    }

    private setupExpress() : void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private setupMiddlewares() : void {
        this.app.use(express.static('public'));
        this.app.use(express.json());
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