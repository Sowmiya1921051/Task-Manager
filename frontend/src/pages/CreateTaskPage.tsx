import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateTask } from '../hooks/useTasks';
import { useNavigate } from 'react-router-dom';

const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100),
    description: z.string().optional(),
    priority: z.enum(['Low', 'Medium', 'High', 'Urgent']),
    dueDate: z.string().optional(), 
});

type CreateTaskInputs = z.infer<typeof createTaskSchema>;

const CreateTaskPage = () => {
    const navigate = useNavigate();
    const createTaskMutation = useCreateTask();
    const { register, handleSubmit, formState: { errors } } = useForm<CreateTaskInputs>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            priority: 'Medium'
        }
    });

    const onSubmit = (data: CreateTaskInputs) => {
        createTaskMutation.mutate(data, {
            onSuccess: () => {
                navigate('/');
            },
            onError: (error: any) => {
                alert(error.response?.data?.message || 'Failed to create task');
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded shadow w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            {...register('title')}
                            className="mt-1 block w-full border border-gray-300 rounded p-2"
                            type="text"
                        />
                        {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            {...register('description')}
                            className="mt-1 block w-full border border-gray-300 rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Due Date</label>
                        <input
                            {...register('dueDate')}
                            className="mt-1 block w-full border border-gray-300 rounded p-2"
                            type="date"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Priority</label>
                        <select
                            {...register('priority')}
                            className="mt-1 block w-full border border-gray-300 rounded p-2"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => navigate('/')} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                        <button type="submit" disabled={createTaskMutation.isPending} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50">
                            {createTaskMutation.isPending ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskPage;
