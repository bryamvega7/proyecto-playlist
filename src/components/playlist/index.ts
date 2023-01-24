import { Router } from "express";
import { findAll, store, deletePlaylist, findOne } from "./controller";

const playlistRouter: Router = Router();

playlistRouter.get("/", findAll);
playlistRouter.get("/:id", findOne);
playlistRouter.delete("/:id", deletePlaylist);
playlistRouter.post("/", store);

export default playlistRouter;