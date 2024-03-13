import React, { useState } from "react";
import { v4 as newId } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Features from "../Components/Features";

function Home() {
  const navigate = useNavigate();
  const [roomid, setRoomid] = useState("");
  const [username, setUsername] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = newId();
    setRoomid(id);
    toast.success("Created a new room");
  };
  const joinRoom = () => {
    if (!roomid || !username) {
      toast.error("Room ID & Username required");
      return;
    }
    // redirect
    navigate(`/editor/${roomid}`, {
      state: {
        username,
      },
    });
  };
  return (
    <>
      <section class="text-gray-400 bg-gray-900 body-font">
        <div class="container mx-auto flex flex-col md:flex-row items-center px-5 py-24">
          <div class="lg:w-1/2 lg:pr-24 md:pr-16 flex flex-col items-center md:items-start md:text-left mb-16 md:mb-0 text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white leading-tight tracking-tight">
              Welcome to <span class="text-blue-500">CodeShare Slate</span>
            </h1>
            <h2 class="title-font sm:text-2xl text-xl mb-4 font-medium text-white leading-tight tracking-tight">
              Collaborative Code Sharing and Whiteboard Platform
            </h2>
            <p class="mb-8 leading-relaxed text-gray-300">
              Share your code, brainstorm ideas, and collaborate seamlessly with
              CodeShare Slate. Whether you're working on a solo project or
              collaborating with a team, our platform provides the tools you
              need to code, visualize, and innovate together in real-time.
            </p>
          </div>
          <div class="lg:w-1/2 md:w-1/2 w-full">
            <div class="bg-gray-800 text-white rounded-lg shadow-lg p-8 md:w-3/4 mx-auto">
              <h2 class="text-3xl font-bold mb-6">Join Room</h2>
              <div class="mb-6">
                <label for="username" class="block mb-2 text-gray-400">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  class="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your username"
                />
              </div>
              <div class="mb-6">
                <label for="roomId" class="block mb-2 text-gray-400">
                  Room ID
                </label>
                <input
                  type="text"
                  id="roomId"
                  value={roomid}
                  onChange={(e) => setRoomid(e.target.value)}
                  class="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter room ID"
                />
              </div>
              <button
                onClick={joinRoom}
                class="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-6"
              >
                Join Room
              </button>
              <p class="text-sm text-center">
                I don't have an invite.{" "}
                <a
                  onClick={createNewRoom}
                  href="#"
                  class="text-blue-500 hover:underline"
                >
                  Create New Room
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Fetures Section */}
     <Features/>
    </>
  );
}

export default Home;
