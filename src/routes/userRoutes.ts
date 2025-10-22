import { Router } from 'express';
import { authMiddleware } from '@src/middleware/authMiddleware';
import * as userController from '@controllers/userController';

const router = Router();

router.post('/users/login', userController.login);
router.post('/users', userController.createUser);

router.get('/users', authMiddleware, userController.getAll);
router.get('/users/:id', authMiddleware, userController.getById);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

export default router;