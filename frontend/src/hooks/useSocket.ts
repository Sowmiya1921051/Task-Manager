import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
       
        const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
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
