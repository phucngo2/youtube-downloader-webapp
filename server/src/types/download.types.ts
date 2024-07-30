export interface IDownloadRequest {
  url: string;
  itag: number | string;
  videoTitle: string;
}

export interface IRenderRequest extends IDownloadRequest {
  savePath: string;
}

export interface IDownloadMessage {
  downloaded: number;
  total: number;
}

export const DownloadStatusEnum = {
  Success: "Success",
  Failed: "Failed",
  Pending: "Pending",
} as const;

export type DownloadStatus =
  (typeof DownloadStatusEnum)[keyof typeof DownloadStatusEnum];

export interface IDownloadResult {
  status: DownloadStatus;
  fullSavePath?: string;
}
