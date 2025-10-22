import { Router } from 'express';
import path from 'path';
import userRoutes from './userRoutes';
import taskRoutes from './taskRoutes';

class Routes {
    static define(router: Router): Router {
        // Adiciona as rotas de usuário sob o prefixo /api
        router.use('/api', userRoutes);
        router.use('/api', taskRoutes);

        // router.get('/', (req, res) => {
        //     // res.send('Hello world!');
        //     res.sendFile(path.join(__dirname, '../../public/index.html'))
        // });

        return router;
    }
}

export default Routes.define(Router());