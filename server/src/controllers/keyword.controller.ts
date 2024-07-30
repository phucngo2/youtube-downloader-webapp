import { Request, Response } from "express";
import { YoutubeDownloader } from "../services/youtubeDownloader";
import { VideoInfoRequestBody } from "../types";

export class KeywordController {
  async listKeywords(req: Request, res: Response) {
    try {
      const { url } = req.body as VideoInfoRequestBody;

      if (!url) {
        return res.status(400).json({
          error: "Missing url",
        });
      }

      const keywords = await YoutubeDownloader.listKeywords(url);

      return res.json({
        keywords,
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  }
}
