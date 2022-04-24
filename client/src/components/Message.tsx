import React from "react";

interface MessageProps {
    message: string;
    className?: string;
}

const Message: React.FC<MessageProps> = ({ message, className }) => {
    return (
        <div
            className={`ui message ${className}`}
            style={{
                padding: "0.75rem 1rem",
            }}
        >
            {message}
        </div>
    );
};

export default Message;
