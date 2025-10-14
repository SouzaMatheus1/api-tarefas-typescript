import { User } from '@prisma/client';
import prismaClient from '@database/prismaClient';
import bcrypt from 'bcryptjs';

type UserCreationData = Omit<User, 'id' | 'created_at'>;
type UserData = Omit<User, 'password'>;

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

export const getAllService = async (): Promise<UserData> => {
    const users = prismaClient.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            tasks: true,
            created_at: true
        }
    });

    return users;
}