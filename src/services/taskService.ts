import { Task } from '@prisma/client';
import prismaClient from '@database/prismaClient';

export const getAllService = async (): Promise<Task[]> => {
    const tasks = await prismaClient.task.findMany();
    
    return tasks;
};

export const getByIdService = async (id: number): Promise<Task | null> => {
    const task = await prismaClient.task.findUnique({
        where: { id: id }
    });
    
    return task;
};

export const createTaskService = async (taskData: Task): Promise<Task> => {
    const newTask = await prismaClient.task.create({
        data: {
            ...taskData
        }
    });

    return newTask;
};

export const updateTaskService = async (id: number, taskData: Partial<Task>): Promise<Task | null> => {
    const task = await getByIdService(id);
    if (!task) return null;

    const updatedTask = await prismaClient.task.update({
        where: { id: id },
        data: {
            ...taskData
        }
    });

    return updatedTask;
};

export const deleteTaskService = async (id: number): Promise<Task | null> => {
    const task = await getByIdService(id);
    if (!task) return null;

    const deletedTask = await prismaClient.task.delete({
        where: { id: id }
    });

    return deletedTask;
};

export const atributeTaskToUserService = async (taskId: number, userId: number): Promise<Task | null> => {
    const task = await getByIdService(taskId);
    if (!task) return null;

    const user = await prismaClient.user.findUnique({
        where: { id: userId }
    });
    if (!user) return null;

    const updatedTask = await prismaClient.task.update({
        where: { id: taskId },
        data: {
            attributed_id: userId
        }
    });

    return updatedTask;
};