import { User } from '@prisma/client';
import prismaClient from '../database/prismaClient';
import bcrypt from 'bcryptjs';
//  A library to help you hash passwords.

type UserCreationData = Omit<User, 'id' | 'created_at'>;
type UserData = Omit<User, 'password'>;

export const createUserService = async (userData: UserCreationData) : Promise<UserData> =>{
    
}