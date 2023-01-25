import { Router } from "express";
import { findAll, findOne, store } from "./controller";
import { checkAuth } from "../auth/middleware";

const songRouter: Router = Router();

songRouter.get("/", checkAuth, findAll);
songRouter.get("/:id", findOne);
songRouter.post("/", store);

export default songRouter;