import { io } from "socket.io-client";

// The backend URL is http://localhost:3000/api, but Socket.IO needs the root URL
const SOCKET_URL = import.meta.env.VITE_BACKEND_URL.replace("/api", "");

export const socket = io(SOCKET_URL, {
    withCredentials: true,
});