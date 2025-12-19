import { useUpdateTask, useDeleteTask } from '../hooks/useTasks'; 

interface TaskCardProps {
    task: any;
}

const TaskCard = ({ task }: TaskCardProps) => {
    const updateTaskMutation = useUpdateTask(); 
    const deleteTaskMutation = useDeleteTask();

    const priorityColors = {
        Low: 'bg-green-100 text-green-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        High: 'bg-orange-100 text-orange-800',
        Urgent: 'bg-red-100 text-red-800',
    };

    const handleDelete = () => {
        if (window.confirm('Delete this task?')) {
            deleteTaskMutation.mutate(task._id);
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow mb-3 border hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
                <h4 className="font-semibold text-lg">{task.title}</h4>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${(priorityColors as any)[task.priority]}`}>{task.priority}</span>
            </div>
            <p className="text-gray-600 text-sm mt-1 mb-2 line-clamp-2">{task.description}</p>

            <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</span>
                <button onClick={handleDelete} className="text-red-500 hover:text-red-700">Delete</button>
            </div>
            <div className="mt-2 text-xs text-gray-400">
                Assigned to: {task.assignedToId?.name || 'Unassigned'}
            </div>

            <div className="flex gap-1 mt-2">
                {task.status !== 'To Do' && <button className="text-xs bg-gray-200 px-1 rounded" onClick={() => updateTaskMutation.mutate({ id: task._id, data: { status: 'To Do' } })}>To Do</button>}
                {task.status !== 'In Progress' && <button className="text-xs bg-blue-100 px-1 rounded" onClick={() => updateTaskMutation.mutate({ id: task._id, data: { status: 'In Progress' } })}>Prog</button>}
                {task.status !== 'Completed' && <button className="text-xs bg-green-100 px-1 rounded" onClick={() => updateTaskMutation.mutate({ id: task._id, data: { status: 'Completed' } })}>Done</button>}
            </div>
        </div>
    );
};

export default TaskCard;
