import { PrismaClient, User } from '@prisma/client';
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email }
  })
  if (!user) {
    res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
    return;
  }
  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    res.status(400).json({ ok: false, message: 'Contraseña incorrecta' });
    return;
  }
  res.status(200).json({ ok: true, user });
}
