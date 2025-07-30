import React from "react";

const MessageBubble = ({ sender, content, isOwnMessage }) => {
  const isSystem = sender === "System";

  return (
    <div
      className={`flex ${
        isSystem
          ? "justify-center"
          : isOwnMessage
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-2 rounded-lg text-sm max-w-[70%] ${
          isSystem
            ? "bg-neutral-700 text-white"
            : isOwnMessage
            ? "bg-blue-500 text-white"
            : "bg-neutral-800 text-white"
        }`}
      >
        {!isSystem && (
          <div className="text-xs font-semibold mb-1 text-neutral-300">
            {sender}
          </div>
        )}
        <div>{content}</div>
      </div>
    </div>
  );
};

export default MessageBubble;
