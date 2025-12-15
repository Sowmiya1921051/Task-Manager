import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io('http://localhost:5000', {
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
