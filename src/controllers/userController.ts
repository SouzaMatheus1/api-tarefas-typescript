import { 
    Request, 
    Response 
} from "express";

import * as userService from "@services/userService";
import { loginService } from "@src/services/loginService";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if(!email || !password)
            return res.status(400).json({ message: "Email e senha sao obrigatorios" });

        const response = await loginService(email, password);

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: "Email ou senha inválida." });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllService();

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Erro: ", error });
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const data = req.params.id;
        const id = parseInt(data, 10);

        if(isNaN(id))
            return res.status(400).json({ message: "Erro ao buscar ID" });

        const user = await userService.getByIdService(id);

        if(!user)
            return res.status(404).json({ message: "Usuario nao encontrado" });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Erro: ", error });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const reqData = req.body;

        if (!reqData)
            return res.status(400).json({ message: "Nome e email sao obrigatorios" });

        const newUser = await userService.createUserService(reqData);

        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: "Erro: ", error });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const reqData = req.body;

        if(isNaN(id))
            return res.status(400).json({ message: "Erro ao buscar ID" });

        const updateUser = await userService.updateUserService(id, reqData);

        return res.status(204).json(updateUser);
    } catch (error) {
        return res.status(500).json({ message: "Erro: ", error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);

        if(isNaN(id))
            return res.status(400).json({ message: "Erro ao buscar ID" });

        await userService.deleteUserService(id);

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: "Erro: ", error });
    }
};