import axios from "axios";
import React from "react";
import { VideoFormat, VideoData } from "../types";
import { downloadBlob } from "../utils/helpers";

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
  const handleDownload = (format: VideoFormat) => {
    setDownloading(true);
    setIsShowing(true);

    if (format.itag === "highestaudio") {
      axios("/download/downloadmp3", {
        method: "POST",
        data: {
          url: data.videoUrl,
        },
        responseType: "blob", // important
      })
        .then((response) => {
          downloadBlob(response.data, `${data.title}.mp3`);
          setDownloading(false);
        })
        .catch((error) => console.log(error.response));
    } else {
      axios("/download/downloadconverted", {
        method: "POST",
        data: {
          url: data.videoUrl,
          quality: `${format.itag}`,
        },
        responseType: "blob", // important
      })
        .then((response) => {
          downloadBlob(response.data, `${data.title}.mp4`);
          setDownloading(false);
        })
        .catch((error) => console.log(error.response));
    }
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
