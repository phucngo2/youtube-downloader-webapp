import axios from "axios";
import React from "react";
import { VideoFormat, VideoData } from "../types";
import { downloadBlob } from "../utils/helpers";
import {
  DOWNLOAD_CONVERTED_API_PATH,
  DOWNLOAD_MP3_API_PATH,
} from "../config/api.config";

interface DownloadButtonProps {
  downloading: boolean;
  setDownloading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
  data: VideoData;
  format: VideoFormat;
}

const DownloadConvertedButton: React.FC<DownloadButtonProps> = ({
  downloading,
  setDownloading,
  setIsShowing,
  data,
  format,
}) => {
  const downloadFile = (url: string, filename: string) => {
    axios(url, {
      method: "POST",
      data: {
        url: data.videoUrl,
        quality: `${format.itag}`,
      },
      responseType: "blob", // important
    })
      .then((response) => {
        downloadBlob(response.data, filename);
        setDownloading(false);
      })
      .catch((error) => console.log(error.response));
  };

  const handleDownload = (format: VideoFormat) => {
    setDownloading(true);
    setIsShowing(true);

    const isAudio = format.itag === "highestaudio";
    const apiPath = isAudio
      ? DOWNLOAD_MP3_API_PATH
      : DOWNLOAD_CONVERTED_API_PATH;
    const filename = `${data.title}${isAudio ? ".mp3" : ".mp4"}`;

    downloadFile(apiPath, filename);
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

export default DownloadConvertedButton;
