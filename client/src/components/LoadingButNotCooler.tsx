import React from "react";

import RikkaGif from "../static/Rikka.gif";

interface LoadingButNotCoolerProps {
    videoTitle: string;
    downloading: boolean;
}

const LoadingButNotCooler: React.FC<LoadingButNotCoolerProps> = ({
    videoTitle,
    downloading,
}) => {
    return (
        <div className="loading-cooler-container">
            <div className="loading-cooler-left">
                <img src={RikkaGif} alt="Rikka Gif" />
            </div>
            <div className="loading-cooler-right fs-14">
                <h6 className="fs-14 my-2">{videoTitle}</h6>

                <div>{downloading ? "Converting your video..." : "Done!!"}</div>
            </div>
        </div>
    );
};

export default LoadingButNotCooler;
