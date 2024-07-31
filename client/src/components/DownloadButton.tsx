import axios from "axios";
import React from "react";
import { VideoFormat, VideoData } from "../types";

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
    axios("/video/download", {
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
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        if (format.hasAudio && !format.hasVideo && format.container === "mp4") {
          link.setAttribute("download", `${data.title}.mp3`);
        } else {
          link.setAttribute("download", `${data.title}.${format.container}`);
        }

        document.body.appendChild(link);
        link.click();

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
