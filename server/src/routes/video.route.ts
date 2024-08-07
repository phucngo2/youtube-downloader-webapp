import express from "express";
import { VideoController } from "../controllers/video.controller";

export const videoRouter = express.Router();

const videoController = new VideoController();

const path = "/video";

videoRouter.post(path, videoController.getVideoInfo);
videoRouter.post(`${path}/download`, videoController.downloadVideo);
