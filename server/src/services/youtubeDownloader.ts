const ytdl = require("ytdl-core");

export class YoutubeDownloader {
    public static async listKeywords(url: string) {
        const video = await ytdl.getInfo(url);
        const keywords = video.videoDetails.keywords;
        return keywords;
    }

    public static async listFormats(url: string) {
        const video = await ytdl.getInfo(url);

        return {
            videoUrl: video.videoDetails.video_url,
            formats: video.formats,
            thumbnail: video.videoDetails.thumbnails.at(-1).url,
            title: video.videoDetails.title,
            keywords: video.videoDetails.keywords,
        };
    }

    public static async downloadVideo(url: string, quality: string) {
        return ytdl(url, {
            quality: quality,
        });
    }
}
