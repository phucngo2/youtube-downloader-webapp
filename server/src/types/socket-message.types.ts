import { IDownloadMessage } from "./download.types";

export interface IEventDownloadProgress {
  event: string;
  data: IDownloadMessage;
}
