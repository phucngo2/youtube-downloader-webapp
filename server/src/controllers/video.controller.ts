import { Request, Response } from "express";
import path from "node:path";
import { FormatMapper } from "../mappers/video.mapper";
import { FfmpegHandler } from "../services/ffmpegHandler";
import { FileSystemHandler } from "../services/fileSystemHanlder";
import { YoutubeDownloader } from "../services/youtubeDownloader";
import { IRenderRequest } from "../types";
import { Random } from "../utils/random";
import { importWorker } from "../utils/worker";

export class VideoController {
  async getVideoInfo(req: Request, res: Response) {
    try {
      const { url } = req.body as RequestBody;

      if (!url) {
        return res.status(400).json({
          error: "Missing url",
        });
      }

      const video = await YoutubeDownloader.listFormats(url);

      return res.json({
        ...video,
        formats: video.formats.map((format: any) =>
          FormatMapper.mapReturnType(format)
        ),
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error,
        message: error.message,
      });
    }
  }

  async downloadVideo(req: Request, res: Response) {
    try {
      const { url, quality, mimeType, container } = req.body as RequestBody;

      if (!url || !quality) {
        return res.status(400).json({
          error: "Missing url or itag",
        });
      }

      const videoReadableStream = await YoutubeDownloader.downloadVideo(
        url,
        quality
      );

      res.set(
        "Content-disposition",
        "attachment; filename=" + `video.${container}`
      );
      res.set("Content-type", mimeType);

      videoReadableStream.pipe(res);
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  }

  async downloadVideoButCooler(req: Request, res: Response) {
    const { url, quality } = req.body as RequestBody;

    if (!url || !quality) {
      return res.status(400).json({
        error: "Missing url or itag",
      });
    }

    const videoId = Random.uuid();

    const videoReadableStream = await YoutubeDownloader.downloadVideo(
      url,
      quality
    );

    const audioReadableStream = await YoutubeDownloader.downloadVideo(
      url,
      "highestaudio"
    );

    const { ffmpegProcess, videoPath } = FfmpegHandler.convertVideo(
      videoReadableStream,
      audioReadableStream,
      videoId
    );

    ffmpegProcess.on("exit", (code: number) => {
      if (code === 0) {
        return res.download(videoPath, (err: any) => {
          if (err) {
            console.log(err);
          } else {
            FileSystemHandler.unlink(videoPath);
          }
        });
      } else {
        return res.status(500).json({
          error: "Failed to convert video",
        });
      }
    });
  }

  async downloadMp3(req: Request, res: Response) {
    const { url, quality } = req.body as RequestBody;

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

    worker.on("message", (message) => {
      if ("status" in message) {
        return res.download(savePath, (err: any) => {
          if (err) {
            console.log(err);
          } else {
            FileSystemHandler.unlink(savePath);
          }
        });
      } else {
      }
    });
  }
}

interface RequestBody {
  url: string;
  quality: string;
  mimeType: string;
  container: string;
  contentLength: string;
}
