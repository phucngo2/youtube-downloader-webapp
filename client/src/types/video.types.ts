export interface VideoData {
  videoUrl: string;
  thumbnail: string;
  title: string;
  formats: VideoFormat[];
  keywords: string[];
}

export interface VideoFormat {
  mimeType: string;
  qualityLabel: string;
  itag: number | string;
  quality: string;
  fps: number;
  audioQuality: string;
  url: string;
  hasVideo: boolean;
  hasAudio: boolean;
  container: string;
  contentLength: string;
  bitrate: number;
}
