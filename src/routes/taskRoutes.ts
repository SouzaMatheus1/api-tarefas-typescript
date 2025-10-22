import { Router } from "express";
import { authMiddleware } from "@src/middleware/authMiddleware";
import * as taskController from "@controllers/taskController";

const router = Router();

router.get('/tasks', authMiddleware, taskController.getAll);
router.get('/tasks/:id', authMiddleware, taskController.getById);
router.post('/tasks', authMiddleware, taskController.createTask);
router.put('/tasks/:id', authMiddleware, taskController.updateTask);
router.delete('/tasks/:id', authMiddleware, taskController.deleteTask);
router.post('/tasks/attribute', authMiddleware, taskController.atributeTaskToUser);

export default router;