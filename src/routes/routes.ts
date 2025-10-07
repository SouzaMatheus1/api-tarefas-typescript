import { Router } from 'express';

class Routes{
    static define(router: Router) : Router {
        router.use('/', (req, res) => {
            res.send('Hello world!')
        });

        return router;
    }
}

export default Routes.define(Router());