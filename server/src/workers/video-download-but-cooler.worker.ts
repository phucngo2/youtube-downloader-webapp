import ytdl from "@distube/ytdl-core";
import pathToFfmpeg from "ffmpeg-static";
import childProcess from "node:child_process";
import { Writable } from "node:stream";
import worker_threads from "node:worker_threads";
import {
  DownloadStatus,
  DownloadStatusEnum,
  IDownloadMessage,
  IDownloadResult,
  IRenderRequest,
} from "../types";
import { throttle } from "../utils/helper";

const request: IRenderRequest = worker_threads.workerData;
const parentPort = worker_threads.parentPort;
const savePath = request.savePath;
try {
  let videoStream = ytdl(request.url, {
    quality: request.itag,
  });

  // Send current loading state to renderer
  videoStream.on(
    "progress",
    throttle((_: unknown, downloaded: number, total: number) => {
      let message: IDownloadMessage = {
        downloaded,
        total,
      };
      parentPort?.postMessage(message);
    })
  );

  let audioStream = ytdl(request.url, {
    quality: "highestaudio",
  });

  const ffmpegProcess = childProcess.spawn(
    pathToFfmpeg!,
    [
      // Remove ffmpeg's console spamming
      "-loglevel",
      "8",
      "-hide_banner",
      // Redirect/Enable progress messages
      //"-progress",
      //"pipe:2",
      // Set inputs
      "-i",
      "pipe:3",
      "-i",
      "pipe:4",
      // Map audio & video from streams
      "-map",
      "0:a",
      "-map",
      "1:v",
      // Keep encoding
      "-c:v",
      "copy",
      // Override existing file
      "-y",
      // Define output file
      savePath,
    ],
    {
      windowsHide: true,
      stdio: [
        /* Standard: stdin, stdout, stderr */
        "inherit",
        "inherit",
        "inherit",
        /* Custom: pipe:3, pipe:4, pipe:5 */
        "pipe",
        "pipe",
        "pipe",
      ],
    }
  );

  audioStream.pipe(ffmpegProcess.stdio[3] as Writable);
  videoStream.pipe(ffmpegProcess.stdio[4] as Writable);

  // On close ffmpeg process
  ffmpegProcess.on("close", (code) => {
    let status: DownloadStatus =
      code === 0 ? DownloadStatusEnum.Success : DownloadStatusEnum.Failed;
    let result: IDownloadResult = {
      status,
      fullSavePath: savePath,
    };
    parentPort?.postMessage(result);
  });
} catch {
  parentPort?.postMessage({
    status: DownloadStatusEnum.Failed,
  });
}
