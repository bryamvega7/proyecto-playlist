import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const playlistsong = await prisma.playlistSong.findMany({
        include: { song: true, playlist: true}
      });
  
      res.status(200).json({
        ok: true,
        data: playlistsong,
      });
    } catch (error) {
      res.status(500).json({ ok: false, message: error });
    }
  };
  
export const store = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
  
      await prisma.playlistSong.create({ data });
  
      res.status(201).json({ ok: true, message: "Song añadido correctamente en Playlist" });
    } catch (error) {
      res.status(500).json({ ok: false, message: error });
    }
  };