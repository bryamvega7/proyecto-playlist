import { Router } from "express";
import { findAll, store } from "./controller";

const playlistsongRouter: Router = Router();

playlistsongRouter.get("/", findAll);
playlistsongRouter.post("/", store);

export default playlistsongRouter;