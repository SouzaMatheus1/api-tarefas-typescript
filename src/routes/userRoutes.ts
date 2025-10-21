import { Router } from 'express';
import { createUser, deleteUser, getAll, getById, updateUser } from '@controllers/userController';

const router = Router();

router.get('/users', getAll);
router.put('/users/:id', getById);
router.post('/users', createUser);
router.delete('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;