import React, { useMemo } from "react";
import { useHandleDownload } from "../hooks";
import { VideoData } from "../types";
import { filterDownloadFormat, humanFileSize } from "../utils/helpers";
import DownloadConvertedButton from "./DownloadConvertedButton";
import LoadingButNotCooler from "./LoadingButNotCooler";
import DownloadModal from "./Modal";
import Table from "./Table";

interface VideoConvertProps {
  data: VideoData;
}

const VideoConvert: React.FC<VideoConvertProps> = ({ data }) => {
  const { downloading, handleDownload, isShowing, setIsShowing, size } =
    useHandleDownload(data);

  const dataConvert = useMemo(() => {
    return filterDownloadFormat(data.formats);
  }, [data]);

  return (
    <div className="w-content pt-2 pb-4 border-top">
      <div className="fw-bold pb-3 pt-2">Encode &amp; Download!</div>

      <div className="pb-4">
        The original YouTube video format doesn't have audio. These options
        below will encode the video to merge video and audio together before
        downloading, so it will take a little bit longer than usual, but the
        video output will have higher quality with audio included.
        <ul>
          <li>
            The "Highest Quality" option will automatically choose the best
            video quality format to encode.
          </li>
          <li>
            The "Audio" option will automatically choose the best audio quality
            format and convert to mp3.
          </li>
        </ul>
      </div>

      <Table
        headings={["Quality", "Container", "Original Size", "Actions"]}
        data={dataConvert.map((format) => ({
          quality:
            format.hasAudio && !format.hasVideo ? "Audio" : format.qualityLabel,

          container:
            format.hasAudio && !format.hasVideo && format.container === "mp4"
              ? "mp3"
              : format.container,

          contentLength: isNaN(format.contentLength as any)
            ? "Cannot calculated!"
            : humanFileSize(Number.parseInt(format.contentLength)),

          url: (
            <>
              <DownloadConvertedButton
                format={format}
                handleDownload={handleDownload}
                downloading={downloading}
              />
              {format.url && (
                <a
                  className="ui icon right labeled button fs-14"
                  href={format.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Preview
                  <i aria-hidden="true" className="right play icon"></i>
                </a>
              )}
            </>
          ),

          key: format.mimeType + format.contentLength,
        }))}
      />

      <DownloadModal
        title="Downloading..."
        modalContent={
          <LoadingButNotCooler videoTitle={data.title} size={size} />
        }
        open={isShowing}
        setOpen={setIsShowing}
        closable={!downloading}
      />
    </div>
  );
};

export default VideoConvert;
