export interface VideoDownloadRequestBody {
  url: string;
  quality: string;
  mimeType: string;
  container: string;
  contentLength: string;
}

export interface VideoInfoRequestBody {
  url: string;
}
