import axios from "axios";
import { VideoData, VideoFormat } from "../types";
import { downloadBlob } from "../utils/helpers";
import { useDownloadProgressContext } from "../contexts";
import {
  DOWNLOAD_CONVERTED_API_PATH,
  DOWNLOAD_MP3_API_PATH,
} from "../config/api.config";
import { useCallback, useState } from "react";
import { useModal } from "./useModal";

export const useHandleDownload = (data: VideoData) => {
  const { clearProgress, completeProgress } = useDownloadProgressContext();
  const [downloading, setDownloading] = useState(false);
  const { isShowing, setIsShowing } = useModal();
  const [size, setSize] = useState<string>("");

  const downloadFile = useCallback(
    (format: VideoFormat, url: string, filename: string) => {
      axios(url, {
        method: "POST",
        data: {
          url: data.videoUrl,
          quality: `${format.itag}`,
        },
        responseType: "blob", // important
      })
        .then((response) => {
          completeProgress();
          downloadBlob(response.data, filename);
          setDownloading(false);
        })
        .catch((error) => console.log(error.response));
    },
    [setDownloading]
  );

  const handleDownload = useCallback(
    (format: VideoFormat) => {
      clearProgress();
      setSize(format.contentLength);
      setDownloading(true);
      setIsShowing(true);

      const isAudio = format.itag === "highestaudio";
      const apiPath = isAudio
        ? DOWNLOAD_MP3_API_PATH
        : DOWNLOAD_CONVERTED_API_PATH;
      const filename = `${data.title}${isAudio ? ".mp3" : ".mp4"}`;

      downloadFile(format, apiPath, filename);
    },
    [setDownloading, setIsShowing, downloadFile]
  );

  return { handleDownload, downloading, isShowing, setIsShowing, size };
};
