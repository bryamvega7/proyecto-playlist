import { Router } from "express";
import { login } from "./controller";
import { checkAuth } from "./middleware";

const authRouter: Router = Router();

authRouter.post("/login", login);
authRouter.use(checkAuth);

export default authRouter;