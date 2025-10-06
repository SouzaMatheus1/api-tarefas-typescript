// a separação do setup do servidor ajuda na 
// hora de implementar testes automatizados.
import { SetupApp } from './setupApp';

class Server{
    static start() : void {
        const app = new SetupApp();
        app.init();
        app.start();
    }
}

Server.start();