import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';
import { useSocket } from '../hooks/useSocket';
import { useQueryClient } from '@tanstack/react-query';
import TaskCard from '../components/TaskCard';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const { data: tasks, isLoading, error } = useTasks();
    const socket = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) return;

        socket.on('task:created', () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        });
        socket.on('task:updated', () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        });
        socket.on('task:deleted', () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        });

        return () => {
            socket.off('task:created');
            socket.off('task:updated');
            socket.off('task:deleted');
        };
    }, [socket, queryClient]);

    if (isLoading) return <div className="p-8">Loading tasks...</div>;
    if (error) return <div className="p-8 text-red-500">Error loading tasks</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">Welcome, {user?.name}</span>
                    <button onClick={() => logout()} className="text-sm text-red-600 hover:text-red-800">Logout</button>
                </div>
            </header>

            <main className="flex-1 p-8 overflow-x-auto">
                <div className="mb-6 flex justify-between">
                    <h2 className="text-2xl font-bold">My Tasks Board</h2>
                    {/* Link to Create Task Page (to be implemented or Modal) */}
                    <Link to="/create-task" className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700">New Task</Link>
                </div>

                <div className="flex gap-6 h-full min-w-max">
                    {['To Do', 'In Progress', 'Review', 'Completed'].map(status => (
                        <div key={status} className="w-80 bg-gray-100 rounded-lg p-4 flex flex-col h-full">
                            <h3 className="font-bold text-gray-700 mb-4 flex justify-between">
                                {status}
                                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">{tasks?.filter((t: any) => t.status === status).length}</span>
                            </h3>
                            <div className="flex-1 overflow-y-auto space-y-3">
                                {tasks?.filter((t: any) => t.status === status).map((task: any) => (
                                    <TaskCard key={task._id} task={task} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main >
        </div >
    );
};

export default DashboardPage;
