import prismaClient from '@database/prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginService = async (email: string, password: string) => {
    const user = await prismaClient.user.findUnique({
        where: { email: email }
    });

    if (!user)
        throw new Error("Usuário não encontrado");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
        throw new Error("Senha inválida");

    const token = jwt.sign({
        id: user.id,
        email: user.email
    },
        process.env.JWT_SECRET as string,
        {
            expiresIn: '1d'
        })

    const response = {
        name: user.name,
        token
    };

    return response;
}