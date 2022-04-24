import React from "react";
import { Progress } from "semantic-ui-react";

interface ProgressBarProps {
    percent?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent = 0 }) => {
    return (
        <div className="w-content my-2">
            <Progress percent={percent} indicating progress />
        </div>
    );
};

export default ProgressBar;
