import React, { useMemo } from "react";

import RikkaGif from "../static/Rikka.gif";
import { useDownloadProgressContext } from "../contexts";
import { humanFileSize } from "../utils/helpers";
import ProgressBar from "./ProgressBar";

interface LoadingButNotCoolerProps {
  videoTitle: string;
  size: string;
}

const LoadingButNotCooler: React.FC<LoadingButNotCoolerProps> = ({
  videoTitle,
  size,
}) => {
  const { downloadProgress } = useDownloadProgressContext();

  const downloadPercent = useMemo(() => {
    if (!downloadProgress.total) return 0;
    return Math.round(
      (downloadProgress.downloaded / downloadProgress.total) * 100
    );
  }, [downloadProgress]);

  return (
    <div className="loading-cooler-container">
      <div className="loading-cooler-left">
        <img src={RikkaGif} alt="Rikka Gif" />
      </div>
      <div className="loading-cooler-right fs-14">
        <h6 className="fs-14 my-2">{videoTitle}</h6>

        <div className="my-2">
          Size:{" "}
          {isNaN(size as any)
            ? "Cannot calculated!"
            : humanFileSize(Number.parseInt(size))}
        </div>

        <ProgressBar percent={downloadPercent} />
      </div>
    </div>
  );
};

export default LoadingButNotCooler;
