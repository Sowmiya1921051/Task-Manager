import { Request, Response } from 'express';
import Task from '../models/Task.js';
import { z } from 'zod';
import { Server } from 'socket.io';

const taskSchema = z.object({
    title: z.string().max(100).min(1),
    description: z.string().optional(),
    dueDate: z.string().or(z.date()).optional(),
    priority: z.enum(['Low', 'Medium', 'High', 'Urgent']).optional(),
    status: z.enum(['To Do', 'In Progress',  'Completed']).optional(),
    assignedToId: z.string().optional(),
});

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = taskSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: validation.error.issues[0].message });
            return;
        }

        if (!req.user) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }

        const { title, description, dueDate, priority, status, assignedToId } = req.body;

        const task = await Task.create({
            title,
            description,
            dueDate,
            priority,
            status,
            assignedToId,
            creatorId: req.user._id,
        });

        const io: Server = req.app.get('io');
        io.emit('task:created', task);

        if (assignedToId) {
            // Notify specific user (implementation depends on socket mapping, for now broadcast assignment event)
            io.emit('notification', { message: `You have been assigned to task: ${title}`, userId: assignedToId });
        }

        res.status(201).json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find({
            $or: [
                { creatorId: req.user?._id },
                { assignedToId: req.user?._id }
            ]
        }).populate('assignedToId', 'name email').populate('creatorId', 'name email').sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        // Optional: Check permissions (only creator or assignee can update? Or anyone in collab app?)
        // For now assuming open collaboration as per prompt "users see updates instantly" implies shared workspace.

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).populate('assignedToId', 'name email').populate('creatorId', 'name email');

        const io: Server = req.app.get('io');
        io.emit('task:updated', updatedTask);

        // Check if assignment changed
        if (req.body.assignedToId && req.body.assignedToId !== task.assignedToId?.toString()) {
            io.emit('notification', { message: `You have been assigned to task: ${updatedTask?.title}`, userId: req.body.assignedToId });
        }

        res.json(updatedTask);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        await task.deleteOne();

        const io: Server = req.app.get('io');
        io.emit('task:deleted', { taskId: req.params.id });

        res.json({ message: 'Task removed' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
