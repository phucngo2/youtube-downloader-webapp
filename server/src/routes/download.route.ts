import express from "express";
import { DownloadController } from "../controllers/download.controller";

export const downloadRouter = express.Router();

const downloadController = new DownloadController();

const path = "/download";

downloadRouter.post(
  `${path}/downloadconverted`,
  downloadController.downloadVideoButCooler
);
downloadRouter.post(`${path}/downloadmp3`, downloadController.downloadMp3);
