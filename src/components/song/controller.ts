import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const songs = await prisma.song.findMany();
  
      res.status(200).json({
        ok: true,
        data: songs,
      });
    } catch (error) {
      res.status(500).json({ ok: false, message: error });
    }
  };
  
  export const store = async (req: Request, res: Response): Promise<void> => {
    try {
      const {name, artist, album, year, gender, duration} = req.body;
  
      await prisma.song.create({ data :{
        name: name,
        artist:  artist,
        album: album,
        year: new Date(year),
        gender: gender,
        duration: duration,
      } });
  
      res.status(201).json({ ok: true, message: "Canción creada correctamente" });
    } catch (error) {
      res.status(500).json({ ok: false, message: error });
    }
  };