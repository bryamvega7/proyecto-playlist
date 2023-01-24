import { Router } from "express";
import { findAll, findOne, store } from "./controller";

const songRouter: Router = Router();

songRouter.get("/", findAll);
songRouter.get("/:id", findOne);
songRouter.post("/", store);

export default songRouter;