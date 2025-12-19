import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Expecting VITE_API_URL to be the base URL (e.g., http://localhost:5000 or https://my-api.onrender.com)
        // If the env var includes '/api', we might need to strip it, but usually standard is base URL.
        const socketUrl = import.meta.env.VITE_API_URL || 'https://task-manager-hg0p.onrender.com/';
        const newSocket = io(socketUrl, {
            withCredentials: true,
            transports: ['websocket', 'polling'],
        });
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    return socket;
};
