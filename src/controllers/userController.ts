import { 
    Request, 
    Response 
} from "express";

import { 
    createUserService, 
    getAllService, 
    getByIdService, 
    updateUserService, 
    deleteUserService 
} from "@services/userService";

export const getAll = async (req: Request, res: Response) => {
    try {
        const users = await getAllService();

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

        const user = await getByIdService(id);

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

        const newUser = await createUserService(reqData);

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

        const updateUser = await updateUserService(id, reqData);

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

        await deleteUserService(id);

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: "Erro: ", error });
    }
};