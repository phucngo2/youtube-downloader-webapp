import React from "react";

import "../styles/VideoInfo.css";
import KeywordContainer from "./KeywordContainer";

interface VideoInfoProps {
    data: VideoData;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ data }) => {
    if (!data) return null;

    return (
        <div className="video-info-container w-content py-2">
            <div className="video-info-left">
                <a
                    target="_blank"
                    className="ui medium image w-100"
                    href={data.videoUrl}
                    rel="noreferrer"
                >
                    <img
                        src={data.thumbnail}
                        alt="Video Thumbnail"
                        className="w-100"
                    />
                </a>
                <h6
                    style={{
                        fontSize: "16px",
                        margin: "0.75rem 0",
                        textAlign: "center",
                    }}
                >
                    {data.title}
                </h6>
            </div>
            <div className="video-info-right">
                <KeywordContainer keywords={data.keywords} />
            </div>
        </div>
    );
};

export default VideoInfo;
