import { Router } from 'express';

class Routes{
    static define(router: Router) : Router {
        router.use('/', (req, res) => res.send('API de Tarefas'));

        return router;
    }
}

export default Routes.define(Router());