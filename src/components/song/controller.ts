import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface CustomRequest extends Request {
  userId?: string;
}

export const findAll = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        let songs = await prisma.song.findMany();
        if (!req.userId) {
            songs = songs.filter(song => !song.is_private);
        }
        res.status(200).json({ok: true, data: songs});
    } catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};



  export const findOne = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const id: number = parseInt(req.params.id);
      const songs = await prisma.song.findUnique({
        where: { id: Number(id) }
      });
  
      res.status(200).json({
        ok: true,
        data: songs,
      });
    } catch (error) {
      res.status(500).json({ ok: false, message: error });
    }
  };
  
  export const store = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const {name, artist, album, year, gender, duration, is_private} = req.body;
  
        await prisma.song.create({ data :{
          name: name,
          artist:  artist,
          album: album,
          year: new Date(year),
          gender: gender,
          duration: duration,
          is_private: is_private || false
        } });
        res.status(201).json({ ok: true, message: "Canción creada correctamente" });
      } catch (error) {
        res.status(500).json({ ok: false, message: error });
      }
    };