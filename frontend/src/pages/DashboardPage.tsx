import { useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';
import { useSocket } from '../hooks/useSocket';
import { useQueryClient } from '@tanstack/react-query';
import TaskCard from '../components/TaskCard';
import { Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Plus,
    LogOut,
    Search,
    Bell,
    CheckCircle,
    Clock,
    AlertCircle,
    BarChart3
} from 'lucide-react';

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const { data: tasks, isLoading, error } = useTasks();
    const socket = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) return;

        const handleUpdate = () => queryClient.invalidateQueries({ queryKey: ['tasks'] });

        socket.on('task:created', handleUpdate);
        socket.on('task:updated', handleUpdate);
        socket.on('task:deleted', handleUpdate);

        return () => {
            socket.off('task:created', handleUpdate);
            socket.off('task:updated', handleUpdate);
            socket.off('task:deleted', handleUpdate);
        };
    }, [socket, queryClient]);

    const stats = useMemo(() => {
        if (!tasks) return { total: 0, completed: 0, inProgress: 0, todo: 0 };
        return {
            total: tasks.length,
            completed: tasks.filter((t: any) => t.status === 'Completed').length,
            inProgress: tasks.filter((t: any) => t.status === 'In Progress').length,
            todo: tasks.filter((t: any) => t.status === 'To Do').length,
        };
    }, [tasks]);

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-indigo-200 rounded-full"></div>
                <p className="text-slate-500 font-medium">Loading your workspace...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen bg-rose-50 p-8">
            <div className="glass-card p-8 text-center max-w-md">
                <AlertCircle className="mx-auto text-rose-500 mb-4" size={48} />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Sync Failed</h3>
                <p className="text-slate-600 mb-6">We couldn't load your tasks. Please check your connection and try again.</p>
                <button onClick={() => window.location.reload()} className="btn-primary">Retry Sync</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-ethereal flex flex-col font-sans">
            <header className="glass-header px-8 py-5 flex justify-between items-center">
                <div className="flex items-center gap-4 group">
                    <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-xl shadow-indigo-200 group-hover:scale-110 transition-transform">
                        <LayoutDashboard size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">TaskFlow</h1>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Workspace Active</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-8">

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-extrabold text-slate-800">{user?.name}</p>
                            <p className="text-[10px] text-slate-500 font-bold opacity-80">{user?.email}</p>
                        </div>
                        <div className="relative group">
                            <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg cursor-pointer ring-4 ring-white/50 group-hover:ring-indigo-100 transition-all">
                                {user?.name?.[0].toUpperCase()}
                            </div>
                            <div className="absolute right-0 top-14 w-56 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all translate-y-2 group-hover:translate-y-0 z-50">
                                <div className="px-3 py-2 border-bottom border-slate-100 mb-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase">Account</p>
                                </div>
                                <button onClick={() => logout()} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 font-semibold hover:bg-rose-50 rounded-xl transition-colors">
                                    <LogOut size={18} />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-6 lg:p-10 max-w-[1700px] mx-auto w-full animate-fade-in">
                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="glass-card p-6 flex items-center gap-5">
                        <div className="p-4 bg-indigo-500/10 text-indigo-600 rounded-2xl">
                            <BarChart3 size={28} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total</p>
                            <h3 className="text-3xl font-black text-slate-800">{stats.total}</h3>
                        </div>
                    </div>
                    <div className="glass-card p-6 flex items-center gap-5">
                        <div className="p-4 bg-amber-500/10 text-amber-600 rounded-2xl">
                            <Clock size={28} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Active</p>
                            <h3 className="text-3xl font-black text-slate-800">{stats.inProgress}</h3>
                        </div>
                    </div>
                    <div className="glass-card p-6 flex items-center gap-5">
                        <div className="p-4 bg-emerald-500/10 text-emerald-600 rounded-2xl">
                            <CheckCircle size={28} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Done</p>
                            <h3 className="text-3xl font-black text-slate-800">{stats.completed}</h3>
                        </div>
                    </div>
                    <Link to="/create-task" className="btn-primary flex items-center justify-center gap-3 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                        <Plus size={24} className="group-hover:rotate-180 transition-transform duration-500" />
                        <span className="text-lg font-bold">New Task</span>
                    </Link>
                </div>

                {/* Kanban Board */}
                <div className="flex gap-10 overflow-x-auto pb-10 custom-scrollbar">
                    {['To Do', 'In Progress', 'Completed'].map(status => (
                        <div key={status} className="kanban-column">
                            <div className="flex justify-between items-center mb-6 px-2">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2.5 h-8 rounded-full ${status === 'To Do' ? 'bg-slate-400' :
                                            status === 'In Progress' ? 'bg-amber-400' : 'bg-emerald-400'
                                        }`}></div>
                                    <h3 className="text-xl font-bold text-slate-800">{status}</h3>
                                    <span className="bg-white/50 backdrop-blur-md text-slate-600 text-[11px] font-black px-2.5 py-1 rounded-lg border border-white shadow-sm">
                                        {tasks?.filter((t: any) => t.status === status).length}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
                                {tasks?.filter((t: any) => t.status === status).map((task: any) => (
                                    <TaskCard key={task._id} task={task} />
                                ))}
                                {tasks?.filter((t: any) => t.status === status).length === 0 && (
                                    <div className="glass-card border-dashed border-2 bg-white/20 border-white/40 p-10 text-center">
                                        <p className="text-sm text-slate-500 font-bold opacity-60">Ready for tasks</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main >
        </div >
    );
};

export default DashboardPage;
