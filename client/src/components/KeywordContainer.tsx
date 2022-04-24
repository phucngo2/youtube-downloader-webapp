import React, { useEffect, useState } from "react";
import { Transition } from "semantic-ui-react";

import "../styles/VideoInfo.css";

interface KeywordContainerProps {
    keywords: string[];
}

const KeywordContainer: React.FC<KeywordContainerProps> = ({ keywords }) => {
    const [copied, setCopied] = useState<boolean>(false);

    const copyKeywords = () => {
        navigator.clipboard.writeText(keywords.join(", "));
        setCopied(true);
    };

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    }, [copied]);

    if (!keywords || keywords.length === 0)
        return (
            <div className="keywords-container">
                <div
                    className="ui red message"
                    style={{
                        padding: "0.75rem 1rem",
                    }}
                >
                    This video doesn't have any keyword!
                </div>
            </div>
        );

    return (
        <div className="keywords-container">
            <div className="keywords-zone w-100 border rounded">
                {keywords.map((keyword) => (
                    <div className="keyword-item border" key={keyword}>
                        <div className="keyword-item-text">{keyword}</div>
                    </div>
                ))}

                <div className="floating-copy-container">
                    <i
                        aria-hidden="true"
                        className="copy circular icon color-grey bg-white"
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={copyKeywords}
                    ></i>

                    <div
                        className="position-relative"
                        style={{
                            width: 1,
                        }}
                    >
                        <Transition
                            visible={copied}
                            animation="fade"
                            duration={500}
                        >
                            <div className="copy-message ui left pointing label border basic green">
                                <i
                                    className="icon check"
                                    style={{
                                        display: "inline",
                                    }}
                                ></i>
                                <span>Copied</span>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KeywordContainer;
