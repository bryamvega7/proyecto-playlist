import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const secret = "mysecretkey";

interface CustomRequest extends Request {
    userId?: string;
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
        } else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                res.status(401).json({ message: "Contraseña incorrecta" });
            } else {
                const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1h" });
                res.status(200).json({ message: "Inicio de sesión exitoso", token });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
