import axios from "axios";
import React from "react";
import { VIDEO_DOWNLOAD_API_PATH } from "../config/api.config";
import { VideoData, VideoFormat } from "../types";
import { downloadBlob } from "../utils/helpers";

interface DownloadButtonProps {
  downloading: boolean;
  setDownloading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
  setProgressPercent: React.Dispatch<React.SetStateAction<number>>;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  data: VideoData;
  format: VideoFormat;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  downloading,
  setDownloading,
  setIsShowing,
  data,
  format,
  setProgressPercent,
  setSize,
}) => {
  const onDownloadProgress = (progress: any) => {
    setProgressPercent(Math.round((progress.loaded / progress.total) * 100));
  };

  const handleDownload = (format: VideoFormat) => {
    setDownloading(true);
    setSize(format.contentLength);
    setIsShowing(true);

    // Download video from api
    axios(VIDEO_DOWNLOAD_API_PATH, {
      method: "POST",
      data: {
        url: data.videoUrl,
        quality: `${format.itag}`,
        container: format.container,
        mimeType: format.mimeType,
      },
      responseType: "blob", // important
      onDownloadProgress,
    })
      .then((response) => {
        let title =
          format.hasAudio && !format.hasVideo && format.container === "mp4"
            ? `${data.title}.mp3`
            : `${data.title}.${format.container}`;
        downloadBlob(response.data, title);
        setDownloading(false);
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <button
      className="ui icon right labeled button fs-14 green"
      style={{
        marginRight: "0.75rem",
      }}
      onClick={() => handleDownload(format)}
      disabled={downloading}
    >
      Download
      <i aria-hidden="true" className="right download icon"></i>
    </button>
  );
};

export default DownloadButton;
