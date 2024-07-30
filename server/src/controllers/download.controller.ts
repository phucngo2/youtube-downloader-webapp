import { Request, Response } from "express";
import path from "node:path";
import { FileSystemHandler } from "../services/fileSystemHanlder";
import {
  DownloadStatusEnum,
  IDownloadMessage,
  IDownloadResult,
  IRenderRequest,
  VideoDownloadRequestBody,
} from "../types";
import { Random } from "../utils/random";
import { importWorker } from "../utils/worker";

export class DownloadController {
  async downloadVideoButCooler(req: Request, res: Response) {
    const { url, quality } = req.body as VideoDownloadRequestBody;

    if (!url) {
      return res.status(400).json({
        error: "Missing url",
      });
    }

    const videoId = Random.uuid();
    let savePath = path.join(`static`, `${videoId}.mp4`);
    const workerData: IRenderRequest = {
      itag: quality,
      url,
      videoTitle: videoId,
      savePath,
    };

    const worker = importWorker(
      path.resolve(__dirname, "../workers/video-download-but-cooler.worker.ts"),
      { workerData }
    );

    worker.on("message", (message: IDownloadMessage | IDownloadResult) =>
      handleWorkerMessage(res, savePath, message)
    );
  }

  async downloadMp3(req: Request, res: Response) {
    const { url, quality } = req.body as VideoDownloadRequestBody;

    if (!url) {
      return res.status(400).json({
        error: "Missing url",
      });
    }

    const videoId = Random.uuid();
    let savePath = path.join(`static`, `${videoId}.mp3`);
    const workerData: IRenderRequest = {
      itag: quality,
      url,
      videoTitle: videoId,
      savePath,
    };

    const worker = importWorker(
      path.resolve(__dirname, "../workers/audio-download.worker.ts"),
      { workerData }
    );

    worker.on("message", (message: IDownloadMessage | IDownloadResult) =>
      handleWorkerMessage(res, savePath, message)
    );
  }
}

function handleWorkerMessage(
  res: Response,
  savePath: string,
  message: IDownloadMessage | IDownloadResult
) {
  // Success / Failure
  if ("status" in message) {
    if (message.status == DownloadStatusEnum.Failed) {
      return res.status(500).json({
        error: message,
      });
    }

    return res.download(savePath, (err: any) => {
      if (err) {
        console.log(err);
      } else {
        FileSystemHandler.unlink(savePath);
      }
    });
    // Progress
  } else {
  }
}
