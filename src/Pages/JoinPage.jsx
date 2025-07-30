import React, { useState } from "react";
import { FiCopy } from "react-icons/fi";

const generateRoomId = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

const JoinPage = ({ onJoin }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [generated, setGenerated] = useState("");

  const createRoom = () => {
    const id = generateRoomId();
    setGenerated(id);
    setRoom(id);
  };

  const handleJoin = () => {
    if (!name.trim() || !room.trim()) {
      alert("Please enter both your name and the room code!");
      return;
    }
    onJoin(name, room);
  };

  return (
    <div className="min-h-screen w-screen bg-black relative text-white flex items-center justify-center">
      {/* Dotted Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#000000",
          backgroundImage: `
            radial-gradient(circle, rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-3xl border border-neutral-700 rounded-lg p-8 bg-[#111] shadow-md">
        <h1 className="text-3xl font-mono font-bold mb-1 flex items-center gap-2">
          💬 Real Time Chat
        </h1>
        <p className="text-sm text-neutral-400 mb-6">
          Temporary room that expires after all users exit.
        </p>

        <button
          className="bg-white text-black w-full py-2 mb-5 font-mono font-bold rounded hover:bg-neutral-200 transition"
          onClick={createRoom}
        >
          + Create New Room
        </button>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full bg-black border border-neutral-700 p-2 mb-3 rounded outline-none placeholder:text-neutral-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter Room Code"
            className="flex-1 bg-black border border-neutral-700 p-2 rounded outline-none placeholder:text-neutral-500"
            value={room}
            onChange={(e) => setRoom(e.target.value.toUpperCase())}
          />
          <button
            onClick={handleJoin}
            className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-neutral-200 transition"
          >
            Join
          </button>
        </div>

        {generated && (
          <div className="bg-neutral-800 mt-6 p-4 rounded text-center">
            <p className="text-neutral-400 text-sm mb-1">
              Share this code with your friend:
            </p>
            <div className="flex justify-center items-center gap-2 text-lg font-mono font-bold">
              {generated}
              <FiCopy
                className="cursor-pointer hover:text-neutral-300"
                onClick={() => navigator.clipboard.writeText(generated)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinPage;
