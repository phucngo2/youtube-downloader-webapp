import React from "react";

import "../styles/LoadingButCooler.css";

import RikkaGif from "../static/Rikka.gif";
import ProgressBar from "./ProgressBar";
import { humanFileSize } from "../utils/helpers";

interface LoadingButCoolerProps {
    progessPercent?: number;
    videoTitle: string;
    size: string;
}

const LoadingButCooler: React.FC<LoadingButCoolerProps> = ({
    progessPercent = 0,
    videoTitle,
    size,
}) => {
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

                <ProgressBar percent={progessPercent} />
            </div>
        </div>
    );
};

export default LoadingButCooler;
