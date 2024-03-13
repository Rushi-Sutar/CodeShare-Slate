import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Client from "../Components/Client";
import CodeEditor from "../Components/CodeEditor";
import { initSocket } from "../Websocket/socket";
import Actions from "../../Actions";
import toast from "react-hot-toast";

function Editor() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // hooks
  const location = useLocation();
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const { roomId } = useParams();
  const reactNavigate = useNavigate();

  // clients online

  const [clients, setClients] = useState([]);

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success(`Room id Copied to Clipboard`);
    } catch (error) {
      toast.error(`try again`);
    }
  }
  function leaveRoom() {
    reactNavigate("/");
  }

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.emit(Actions.JOIN, {
        roomId,
        username: location.state?.username,
      });
      // listening for joined event
      socketRef.current.on(
        Actions.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room `);
          }
          setClients(clients);
          socketRef.current.emit(Actions.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // listening for dissconnected

      socketRef.current.on(Actions.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };

    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(Actions.JOINED);
      socketRef.current.off(Actions.DISCONNECTED);
    };
  }, []);

  return (
    <div className="relative bg-gray-900 text-white h-screen">
      {/* Open Drawer Button */}
      <button
        className="absolute bottom-4 right-4 z-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        {drawerOpen ? "Close Menu" : "Menu"}
      </button>

      {/* Drawer */}
      <div
        className={`bg-gray-950 transition-transform duration-300 ease-in-out transform absolute top-0 left-0 h-full z-20 lg:w-1/4 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Connected Clients Section */}
        <div className="p-4 text-center">
          <div className="mb-4">
            <div className="text-lg font-bold text-center">Connected</div>
            <div>
              {clients.map((client) => (
                <Client key={client.socketId} username={client.username} />
              ))}
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="p-4 flex flex-col lg:flex-row justify-center items-center">
          <div className="flex flex-wrap justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2 mx-2"
              onClick={copyRoomId}
            >
              Copy Room ID
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-2 mx-2"
              onClick={leaveRoom}
            >
              Leave Room
            </button>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-grow">
        <CodeEditor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => (codeRef.current = code)}
        />
      </div>
    </div>
  );
}

export default Editor;
