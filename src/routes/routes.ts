import { Router } from 'express';
import path from 'path';

class Routes {
    static define(router: Router): Router {
        router.use('/', (req, res) => {
            // res.send('Hello world!');
            res.sendFile(path.join(__dirname, '../../public/index.html'))
        });

        return router;
    }
}

export default Routes.define(Router());