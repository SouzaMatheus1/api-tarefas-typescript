import { Request, Response } from "express";
import { createUserService, getAllService } from "@services/userService";

export const createUser = async (req: Request, res: Response) => {
    const reqData = req.body;

    if(!reqData)
        return res.status(400);

    const newUser = createUserService(reqData);

    return res.status(201) ? res.json(newUser) : res.status(400)
}

export const getAll = async (req: Request, res: Response) => {
    const users = getAllService();

    return res.status(200) ? res.json(users) : res.status(400);
}