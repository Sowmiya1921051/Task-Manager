import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../api/client';

interface User {
    _id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (data: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (data: any) => {
        const res = await api.post('/auth/login', data);
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
    };

    const register = async (data: any) => {
        const res = await api.post('/auth/register', data);
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
