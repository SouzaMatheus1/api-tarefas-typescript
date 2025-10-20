import { Request, Response } from "express";
import { createUserService, getAllService, getByIdService } from "@services/userService";

export const createUser = async (req: Request, res: Response) => {
    try{
        const reqData = req.body;

        if (!reqData)
            return res.status(400);

        const newUser = await createUserService(reqData);

        return res.status(200).json(newUser);
    }catch (error){
        return res.status(500)
    }
}

export const getAll = async (req: Request, res: Response) => {
    try{
        const users = await getAllService();

        return res.status(200).json(users);
    }catch (error){
        return res.status(500)
    }
}

export const getById = async (req: Request, res: Response) => {
    try{
        const data = req.body;

        const user = await getByIdService(data.id);

        return res.status(200).json(user);
    }catch (error){
        return res.status(500)
    }
}