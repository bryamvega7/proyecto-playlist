import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const playlists = await prisma.playlist.findMany({
        include: { user: true, songs: true}
      });
  
      res.status(200).json({
        ok: true,
        data: playlists,
      });
    } catch (error) {
      res.status(500).json({ ok: false, message: error });
    }
  };
  
export const store = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
  
      await prisma.playlist.create({ data });
  
      res.status(201).json({ ok: true, message: "Playlist creado correctamente" });
    } catch (error) {
      res.status(500).json({ ok: false, message: error });
    }
  };

export const deletePlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
      const id: number = parseInt(req.params.id);
  
      await prisma.playlist.delete({
         where: { 
          id: Number(id) 
        } 
      });
  
      res.status(200).json({ ok: true, message: "Playlist eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ ok: false, message: error });
    }
  };
