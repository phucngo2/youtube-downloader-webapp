import { Request, Response } from "express";
import { FormatMapper } from "../utils/mappers";
import { YoutubeDownloader } from "../services/youtubeDownloader";
import { VideoDownloadRequestBody, VideoInfoRequestBody } from "../types";

export class VideoController {
  async getVideoInfo(req: Request, res: Response) {
    try {
      const { url } = req.body as VideoInfoRequestBody;

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
      const { url, quality, mimeType, container } =
        req.body as VideoDownloadRequestBody;

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
}
