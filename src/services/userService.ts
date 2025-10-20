import { User } from '@prisma/client';
import prismaClient from '@database/prismaClient';
import bcrypt from 'bcryptjs';

type UserCreationData = Omit<User, 'id' | 'created_at'>;
type UserData = Omit<User, 'password'>;

export const getAllService = async (): Promise<UserData[]> => {
    const users = await prismaClient.user.findMany();

    return users;
}

export const getByIdService = async (id: number): Promise<UserData | null> => {
    const user = await prismaClient.user.findUnique({
        where: { id: Number(id) }
    });

    return user;
}

export const createUserService = async (userData: UserCreationData): Promise<UserData> => {
    const hashPass = await bcrypt.hash(userData.password, 10);

    const newUser = await prismaClient.user.create({
        data: {
            ...userData,
            password: hashPass
        }
    });

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}

export const updateUserService = async (id: number, userData: Partial<UserCreationData>): Promise<UserData | null> => {
    const newData: Partial<UserCreationData> = { ...userData };
    const user = await getByIdService(id);

    if(!user){
        console.log('Usuário não encontrado!');
    }

    const updateUser = await prismaClient.user.update({
        where: { id: id },
        data: newData
    });

    const { ...updatedUser } = updateUser;
    return updateUser;
}