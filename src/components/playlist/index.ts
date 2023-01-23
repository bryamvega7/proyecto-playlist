import { Router } from "express";
import { findAll, store, deletePlaylist } from "./controller";

const playlistRouter: Router = Router();

playlistRouter.get("/", findAll);
playlistRouter.get("/:id", findAll);
playlistRouter.delete("/:id", deletePlaylist);
playlistRouter.post("/", store);

export default playlistRouter;