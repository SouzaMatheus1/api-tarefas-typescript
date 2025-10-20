import { Router } from 'express';
import { createUser, getAll } from '@controllers/userController';

const router = Router();

router.post('/users', createUser);
router.get('/users', getAll);

export default router;