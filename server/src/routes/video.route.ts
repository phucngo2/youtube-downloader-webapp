import express from "express";
import { VideoController } from "../controllers/video.controller";
import { DownloadController } from "../controllers/download.controller";

export const videoRouter = express.Router();

const videoController = new VideoController();
const downloadController = new DownloadController();

const path = "/video";

videoRouter.post(path, videoController.getVideoInfo);
videoRouter.post(`${path}/download`, videoController.downloadVideo);
videoRouter.post(
  `${path}/downloadconverted`,
  downloadController.downloadVideoButCooler
);
videoRouter.post(`${path}/downloadmp3`, downloadController.downloadMp3);
