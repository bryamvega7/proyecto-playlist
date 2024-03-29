import express, { type Application } from "express";
import { userRouter, loginRouter, songRouter, playlistRouter, playlistsongRouter } from "./components";
import authRoutes from "./components/auth";

const app: Application = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/users/login", loginRouter);
app.use("/api/v1/songs", songRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/playlist-song", playlistsongRouter);

app.use("/api/auth", authRoutes);

export default app;