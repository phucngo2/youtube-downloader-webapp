import React from "react";
import { VideoFormat } from "../types";

interface DownloadButtonProps {
  downloading: boolean;
  format: VideoFormat;
  handleDownload: (format: VideoFormat) => void;
}

const DownloadConvertedButton: React.FC<DownloadButtonProps> = ({
  downloading,
  format,
  handleDownload,
}) => {
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
