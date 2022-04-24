import axios from "axios";
import React from "react";

interface DownloadButtonProps {
    downloading: boolean;
    setDownloading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
    data: VideoData;
    format: Format;
}

const DownloadConvertedButton: React.FC<DownloadButtonProps> = ({
    downloading,
    setDownloading,
    setIsShowing,
    data,
    format,
}) => {
    const handleDownload = (format: Format) => {
        setDownloading(true);
        setIsShowing(true);

        if (format.itag === "highestaudio") {
            axios("/video/downloadmp3", {
                method: "POST",
                data: {
                    url: data.videoUrl,
                },
                responseType: "blob", // important
            })
                .then((response) => {
                    const url = window.URL.createObjectURL(
                        new Blob([response.data])
                    );
                    const link = document.createElement("a");
                    link.href = url;

                    link.setAttribute("download", `${data.title}.mp3`);

                    document.body.appendChild(link);
                    link.click();

                    setDownloading(false);
                })
                .catch((error) => console.log(error.response));
        } else {
            axios("/video/downloadconverted", {
                method: "POST",
                data: {
                    url: data.videoUrl,
                    quality: `${format.itag}`,
                },
                responseType: "blob", // important
            })
                .then((response) => {
                    const url = window.URL.createObjectURL(
                        new Blob([response.data])
                    );
                    const link = document.createElement("a");
                    link.href = url;

                    link.setAttribute("download", `${data.title}.mp4`);

                    document.body.appendChild(link);
                    link.click();

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
