import React, { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";
import JoinPage from "./pages/JoinPage";
import ChatPage from "./pages/ChatPage";

function App() {
    const socketRef = useRef();
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        socketRef.current = io("http://localhost:3000");

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const handleJoin = (username, roomId) => {
        setName(username);
        setRoom(roomId);
        setJoined(true);
        socketRef.current.emit("join-room", { name: username, room: roomId });
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black text-white">
            <div className="transition-all duration-300 ease-in-out">
                {!joined ? (
                    <JoinPage onJoin={handleJoin} />
                ) : (
                    <ChatPage socketRef={socketRef} name={name} room={room} />
                )}
            </div>
        </div>
    );
}

export default App;
