import React, { useState, useEffect } from "react";
import MessageBubble from "../components/MessageBubble";
import { FiCopy } from "react-icons/fi";

const ChatPage = ({ socketRef, name, room }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState(1);

  useEffect(() => {
    const socket = socketRef.current;

    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user-joined", (data) => {
      setUsers((u) => u + 1);
      setMessages((prev) => [
        ...prev,
        { name: "System", message: `${data.name} joined the room` },
      ]);
    });

    socket.on("user-left", (data) => {
      setUsers((u) => Math.max(1, u - 1));
      setMessages((prev) => [
        ...prev,
        { name: "System", message: `${data.name} left the room` },
      ]);
    });

    return () => {
      socket.off("receive-message");
      socket.off("user-joined");
      socket.off("user-left");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const data = { name, message };
    socketRef.current.emit("message", message);
    setMessages((prev) => [...prev, data]);
    setMessage("");
  };

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#000000",
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Chat UI */}
      <div className="relative z-10 w-[100vh] h-[85vh] max-w-full bg-[#111] border border-neutral-800 rounded-xl flex flex-col p-8">
        {/* Header */}
        <div className="flex justify-between items-center text-sm text-neutral-400 mb-6">
          <div className="bg-neutral-800 px-4 py-2 rounded-full font-mono text-sm flex items-center gap-2">
            Room Code: {room}
            <FiCopy
              className="cursor-pointer hover:text-white"
              onClick={() => navigator.clipboard.writeText(room)}
            />
          </div>
          <div className="text-sm">Users: {users}</div>
        </div>

        {/* Messages */}
        <div className="flex-1 bg-black rounded-lg p-6 overflow-y-auto mb-6 flex flex-col gap-3">
          {messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              sender={msg.name}
              content={msg.message}
              isOwnMessage={msg.name === name}
            />
          ))}
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="flex gap-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-black border border-neutral-700 p-4 rounded-lg outline-none text-white text-base"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-white text-black px-3 py-3 rounded-lg font-semibold hover:bg-neutral-200 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
