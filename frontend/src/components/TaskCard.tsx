import { useUpdateTask, useDeleteTask } from '../hooks/useTasks';
import { Calendar, Trash2, User, ChevronRight, AlertTriangle } from 'lucide-react';

interface TaskCardProps {
    task: any;
}

const TaskCard = ({ task }: TaskCardProps) => {
    const updateTaskMutation = useUpdateTask();
    const deleteTaskMutation = useDeleteTask();

    const priorityConfig = {
        Low: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', border: 'border-emerald-200' },
        Medium: { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-200' },
        High: { bg: 'bg-orange-500/10', text: 'text-orange-600', border: 'border-orange-200' },
        Urgent: { bg: 'bg-rose-500/10', text: 'text-rose-600', border: 'border-rose-200' },
    };

    const config = (priorityConfig as any)[task.priority] || priorityConfig.Medium;

    const handleDelete = () => {
        if (window.confirm('Delete this task?')) {
            deleteTaskMutation.mutate(task._id);
        }
    };

    return (
        <div className="glass-card p-5 group cursor-pointer relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
                <div className={`px-2.5 py-1 rounded-lg border ${config.bg} ${config.text} ${config.border} text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5`}>
                    {task.priority === 'Urgent' && <AlertTriangle size={10} />}
                    {task.priority}
                </div>
                <button onClick={handleDelete} className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                    <Trash2 size={16} />
                </button>
            </div>

            <h4 className="font-extrabold text-slate-800 text-lg mb-2 leading-snug group-hover:text-indigo-600 transition-colors">{task.title}</h4>
            <p className="text-slate-500 text-sm mb-4 line-clamp-2 font-medium leading-relaxed">{task.description}</p>

            <div className="flex flex-wrap items-center gap-4 mb-4 pt-4 border-t border-white/40">
                <div className="flex items-center gap-2 text-slate-400">
                    <Calendar size={14} className="text-indigo-400" />
                    <span className="text-[11px] font-bold">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                    <User size={14} className="text-indigo-400" />
                    <span className="text-[11px] font-bold truncate max-w-[100px]">
                        {task.assignedToId?.name || 'Unassigned'}
                    </span>
                </div>
            </div>

            <div className="flex gap-2">
                {task.status !== 'To Do' && (
                    <button
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-slate-100/50 hover:bg-slate-200/50 text-slate-600 rounded-lg text-[10px] font-black uppercase transition-all"
                        onClick={() => updateTaskMutation.mutate({ id: task._id, data: { status: 'To Do' } })}
                    >
                        To Do
                    </button>
                )}
                {task.status !== 'In Progress' && (
                    <button
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-indigo-50/50 hover:bg-indigo-100/50 text-indigo-600 rounded-lg text-[10px] font-black uppercase transition-all"
                        onClick={() => updateTaskMutation.mutate({ id: task._id, data: { status: 'In Progress' } })}
                    >
                        Start
                        <ChevronRight size={10} />
                    </button>
                )}
                {task.status !== 'Completed' && (
                    <button
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-emerald-50/50 hover:bg-emerald-100/50 text-emerald-600 rounded-lg text-[10px] font-black uppercase transition-all"
                        onClick={() => updateTaskMutation.mutate({ id: task._id, data: { status: 'Completed' } })}
                    >
                        Done
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
