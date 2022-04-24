interface ReturnedVideoFormat {
    mimeType: string;
    qualityLabel: string;
    itag: number;
    quality: string;
    fps: number;
    audioQuality: string;
    url: string;
    hasVideo: boolean;
    hasAudio: boolean;
    container: string;
    contentLength: string;
}

export class FormatMapper {
    static mapReturnType(videoFormat: any): ReturnedVideoFormat {
        return {
            mimeType: videoFormat.mimeType,
            qualityLabel: videoFormat.qualityLabel,
            itag: videoFormat.itag,
            quality: videoFormat.quality,
            fps: videoFormat.fps,
            audioQuality: videoFormat.audioQuality,
            url: videoFormat.url,
            hasVideo: videoFormat.hasVideo,
            hasAudio: videoFormat.hasAudio,
            container: videoFormat.container,
            contentLength: videoFormat.contentLength,
        };
    }
}
