import e, { 
    Request, 
    Response 
} from "express";

import * as taskService from "@services/taskService";

export const getAll = async (req: Request, res: Response) => {
    try {
        const tasks = await taskService.getAllService();
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ message: "Erro: ", error });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const data = req.params.id;
        const id = parseInt(data, 10);

        if (isNaN(id))
            return res.status(400).json({ message: "Erro ao buscar ID" });

        const task = await taskService.getByIdService(id);

        if (!task)
            return res.status(404).json({ message: "Tarefa nao encontrada" });

        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ message: "Erro: ", error });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const reqData = req.body;

        if (!reqData)
            return res.status(400).json({ message: "Dados da tarefa sao obrigatorios" });

        const newTask = await taskService.createTaskService(reqData);

        return res.status(201).json(newTask);
    } catch (error) {
        return res.status(500).json({ message: "Erro: ", error });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const reqData = req.body;

        if (isNaN(id))
            return res.status(400).json({ message: "Erro ao buscar ID" });

        const updatedTask = await taskService.updateTaskService(id, reqData);

        if (!updatedTask)
            return res.status(404).json({ message: "Tarefa nao encontrada" });

        return res.status(200).json(updatedTask);
    } catch (error) {
        return res.status(500).json({ message: "Erro: ", error });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id))
            return res.status(400).json({ message: "Erro ao buscar ID" });

        const deletedTask = await taskService.deleteTaskService(id);

        if (!deletedTask)
            return res.status(404).json({ message: "Tarefa nao encontrada" });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: "Erro: ", error });
    }
};

export const atributeTaskToUser = async (req: Request, res: Response) => {
    try {
        const reqData = req.body;

        if (isNaN(reqData.taskId) || isNaN(reqData.userId))
            return res.status(400).json({ message: "Erro ao buscar ID" });

        const result = await taskService.atributeTaskToUserService(reqData.taskId, reqData.userId);

        if (!result)
            return res.status(404).json({ message: "Tarefa ou usuario nao encontrado" });

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Erro: ", error });
    }
};