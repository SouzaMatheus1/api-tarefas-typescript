import { Request, Response } from "express";
import { createUserService, getAllService, getByIdService, updateUserService } from "@services/userService";

export const getAll = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        var data;

        if(id){
            data = await getByIdService(id);
        }else{
            data = await getAllService();
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500)
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const reqData = req.body;

        if (!reqData)
            return res.status(400);

        const newUser = await createUserService(reqData);

        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(500)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const reqData = req.body;

        const updateUser = await updateUserService(reqData.id, reqData);

        return res.status(204).json(updateUser);
    } catch (error) {
        return res.status(500);
    }
};

export const deleteUser = async (req: Request, res: Response) => {

};