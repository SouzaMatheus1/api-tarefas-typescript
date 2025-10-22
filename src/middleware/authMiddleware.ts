import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: { id: number; email: string };
};

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).json({ message: "Token nao fornecido" });

    const [bearer, token] = authHeader.split(' ');
    if(bearer !== 'Bearer' || !token)
        return res.status(401).json({ message: "Token em formato invalido" });

    try {
        const payload = verify(
            token,
            process.env.JWT_SECRET as string
        ) as { 
            id: number; 
            email: string 
        };

        req.user = payload;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalido" });
    }
}