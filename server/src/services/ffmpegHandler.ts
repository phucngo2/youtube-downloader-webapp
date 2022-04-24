import { FileSystemHandler } from "./fileSystemHanlder";

const child_process = require("child_process");
const ffmpeg = require("ffmpeg-static");
const fs = require("fs");

export class FfmpegHandler {
    public static convertVideo(
        videoStream: any,
        audioStream: any,
        videoName: string
    ): {
        videoPath: string;
        ffmpegProcess: any;
    } {
        const videoPath = `static/${videoName}.mp4`;

        FileSystemHandler.unlink(videoPath);

        // Start the ffmpeg child process
        const ffmpegProcess = child_process.spawn(
            ffmpeg,
            [
                // Remove ffmpeg's console spamming
                "-loglevel",
                "8",
                "-hide_banner",
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
                // Define output file
                videoPath,
            ],
            {
                windowsHide: true,
                stdio: [
                    /* Standard: stdin, stdout, stderr */
                    "inherit",
                    "inherit",
                    "inherit",
                    /* Custom: pipe:3, pipe:4 */
                    "pipe",
                    "pipe",
                ],
            }
        );

        audioStream.pipe(ffmpegProcess.stdio[3]);
        videoStream.pipe(ffmpegProcess.stdio[4]);

        return {
            ffmpegProcess,
            videoPath: videoPath,
        };
    }

    public static convertMp3(audioStream: any, fileName: string) {
        const filePath = `static/${fileName}.mp3`;

        FileSystemHandler.unlink(filePath);

        // Start the ffmpeg child process
        const ffmpegProcess = child_process.spawn(
            ffmpeg,
            [
                // Remove ffmpeg's console spamming
                "-loglevel",
                "8",
                "-hide_banner",
                // Set inputs
                "-i",
                "pipe:3",
                // Keep encoding
                "-c:v",
                "copy",
                // Define output file
                filePath,
            ],
            {
                windowsHide: true,
                stdio: [
                    /* Standard: stdin, stdout, stderr */
                    "inherit",
                    "inherit",
                    "inherit",
                    /* Custom: pipe:3 */
                    "pipe",
                ],
            }
        );

        audioStream.pipe(ffmpegProcess.stdio[3]);

        return {
            ffmpegProcess,
            filePath,
        };
    }
}
