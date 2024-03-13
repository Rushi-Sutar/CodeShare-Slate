import { io } from "socket.io-client";

export const initSocket = async () => {
    return io(import.meta.env.VITE_BACKEND_URL, {
        transports: ['websocket'],
        timeout: 10000,
        reconnectionAttempts: 'infinity',
        forceNew:true,
    });
}

// code for client connecion socket.io client