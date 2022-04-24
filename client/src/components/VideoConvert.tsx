import React from "react";
import { humanFileSize } from "../utils/helpers";
import { useModal } from "../utils/useModal";
import DownloadConvertedButton from "./DownloadConvertedButton";
import LoadingButNotCooler from "./LoadingButNotCooler";
import DownloadModal from "./Modal";
import Table from "./Table";

interface VideoConvertProps {
    data: VideoData;
}

const VideoConvert: React.FC<VideoConvertProps> = ({ data }) => {
    const [downloading, setDownloading] = React.useState(false);
    const { isShowing, setIsShowing } = useModal();

    const dataConvert = data.formats.filter(
        (format) =>
            format.qualityLabel &&
            format.container === "mp4" &&
            (format.qualityLabel.startsWith("720") ||
                format.qualityLabel.startsWith("1080"))
    );

    dataConvert.unshift({
        quality: "highestvideo",
        container: "mp4",
        contentLength: "Very large!",
        itag: "highestvideo",
        mimeType: "video/mp4",
        qualityLabel: "Highest Quality",
        hasAudio: false,
        hasVideo: true,
        fps: 0,
        bitrate: 0,
        audioQuality: "",
        url: "",
    });

    dataConvert.push({
        quality: "highestaudio",
        container: "mp3",
        contentLength: "Very large!",
        itag: "highestaudio",
        mimeType: "audio/mpeg",
        qualityLabel: "Audio",
        hasAudio: true,
        hasVideo: false,
        fps: 0,
        bitrate: 0,
        audioQuality: "highestaudio",
        url: "",
    });

    return (
        <div className="w-content pt-2 pb-4 border-top">
            <div className="fw-bold pb-3 pt-2">Encode &amp; Download!</div>

            <div className="pb-4">
                The original Youtube video format doesn't have audio. These
                options below will encode the video to merge video and audio
                together before downloading, so it will take a little bit longer
                than usual, but the video output will have higher quality with
                audio included.
                <ul>
                    <li>
                        The "Highest Quality" option will automatically choose
                        the best video quality format to encode.
                    </li>
                    <li>
                        The "Audio" option will automatically choose the best
                        audio quality format and convert to mp3.
                    </li>
                </ul>
            </div>

            <Table
                headings={["Quality", "Container", "Original Size", "Actions"]}
                data={dataConvert.map((format) => ({
                    quality:
                        format.hasAudio && !format.hasVideo
                            ? "Audio"
                            : format.qualityLabel,

                    container:
                        format.hasAudio &&
                        !format.hasVideo &&
                        format.container === "mp4"
                            ? "mp3"
                            : format.container,

                    contentLength: isNaN(format.contentLength as any)
                        ? "Cannot calculated!"
                        : humanFileSize(Number.parseInt(format.contentLength)),

                    url: (
                        <>
                            <DownloadConvertedButton
                                format={format}
                                data={data}
                                setIsShowing={setIsShowing}
                                setDownloading={setDownloading}
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
                                    <i
                                        aria-hidden="true"
                                        className="right play icon"
                                    ></i>
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
                    <LoadingButNotCooler
                        videoTitle={data.title}
                        downloading={downloading}
                    />
                }
                open={isShowing}
                setOpen={setIsShowing}
                closable={!downloading}
            />
        </div>
    );
};

export default VideoConvert;
