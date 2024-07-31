import React from "react";
import { humanFileSize } from "../utils/helpers";

import { useModal } from "../utils/useModal";
import DownloadModal from "./Modal";
import Table from "./Table";

import { VideoData } from "../types";
import DownloadButton from "./DownloadButton";
import LoadingButCooler from "./LoadingButCooler";

interface VideoFormatsProps {
  data: VideoData;
}

const VideoFormats: React.FC<VideoFormatsProps> = ({ data }) => {
  const [downloading, setDownloading] = React.useState(false);

  const [progessPercent, setProgressPercent] = React.useState(0);

  const [size, setSize] = React.useState<string>("");

  const { isShowing, setIsShowing } = useModal();

  return (
    <div className="w-content py-2 border-top">
      <div className="fw-bold pb-3 pt-2">Raw Formats!</div>

      <div className="pb-4">
        Some quality formats have 2 options because Youtube generates 2 video
        encoding formats. Please click on "preview" before downloading a video
        format to check whether the format is still working or cannot be played
        by normal player.
      </div>

      <Table
        headings={["Quality", "Container", "Has Audio", "Size", "Actions"]}
        data={data.formats.map((format) => ({
          quality:
            format.hasAudio && !format.hasVideo ? "Audio" : format.qualityLabel,

          container:
            format.hasAudio && !format.hasVideo && format.container === "mp4"
              ? "mp3"
              : format.container,

          hasAudio: format.hasAudio && <i className="icon check green"></i>,

          contentLength: isNaN(format.contentLength as any)
            ? "Cannot calculated!"
            : humanFileSize(Number.parseInt(format.contentLength)),

          url: (
            <>
              <DownloadButton
                format={format}
                data={data}
                setIsShowing={setIsShowing}
                setDownloading={setDownloading}
                downloading={downloading}
                setProgressPercent={setProgressPercent}
                setSize={setSize}
              />

              <a
                className="ui icon right labeled button fs-14"
                href={format.url}
                target="_blank"
                rel="noreferrer"
              >
                Preview
                <i aria-hidden="true" className="right play icon"></i>
              </a>
            </>
          ),

          key: format.mimeType + format.contentLength,
        }))}
      />

      <DownloadModal
        title="Downloading..."
        modalContent={
          <LoadingButCooler
            progessPercent={progessPercent}
            videoTitle={data.title}
            size={size}
          />
        }
        open={isShowing}
        setOpen={setIsShowing}
        closable={!downloading}
        setProgressPercent={setProgressPercent}
      />
    </div>
  );
};

export default VideoFormats;
