import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import Actions from "./Actions.js";
import path from "path";
import { dirname } from "path";

// Initialize Express app
const app = express();
// Create HTTP server
const server = createServer(app);
// Initialize Socket.IO server
const io = new Server(server);
// Map to store user socket connections
const __dirname = path.resolve();

// Serve static files first
app.use(express.static(path.join(__dirname, 'dist')));

// Then serve index.html for other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});



const userSocketMap = {};

// Function to get all connected clients in a room
function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

// Event listener for when a socket connection is established
io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  // Event listener for when a user joins a room
  socket.on(Actions.JOIN, ({ roomId, username }) => {
    // Add user to the socket map
    userSocketMap[socket.id] = username;
    // Join the specified room
    socket.join(roomId);
    // Get all connected clients in the room
    const clients = getAllConnectedClients(roomId);
    // Notify all clients in the room about the new user joining
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(Actions.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  // Event listener for when a code change is received from a client
  socket.on(Actions.CODE_CHANGE, ({ roomId, code }) => {
    // Broadcast the code change to all clients in the room except the sender
    socket.in(roomId).emit(Actions.CODE_CHANGE, {
      code,
    });
  });

  // Event listener for when a code sync request is received from a client
  socket.on(Actions.SYNC_CODE, ({ socketId, code }) => {
    // Emit the code change to the specified client
    io.to(socketId).emit(Actions.CODE_CHANGE, {
      code,
    });
  });

  // Event listener for when a socket disconnects
  socket.on("disconnecting", () => {
    // Get all rooms the socket is connected to
    const rooms = [...socket.rooms];
    // Notify all clients in each room about the disconnection
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(Actions.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    // Remove the disconnected socket from the user socket map
    delete userSocketMap[socket.id];
    // Leave all rooms
    socket.leave();
  });
});

// Define port number for the server
const PORT = process.env.PORT || 5000;
// Start the server
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
