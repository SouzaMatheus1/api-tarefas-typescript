import { Router } from "express";
import * as taskController from "@controllers/taskController";

const router = Router();

router.get('/tasks', taskController.getAll);
router.get('/tasks/:id', taskController.getById);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.post('/tasks/attribute', taskController.atributeTaskToUser);

export default router;