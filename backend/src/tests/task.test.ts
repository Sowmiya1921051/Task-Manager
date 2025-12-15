import { createTask } from '../controllers/taskController';
import Task from '../models/Task';
import { Request, Response } from 'express';

// Mock Mongoose model
jest.mock('../models/Task');

describe('Task Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let json: jest.Mock;
    let status: jest.Mock;

    beforeEach(() => {
        json = jest.fn();
        status = jest.fn().mockReturnValue({ json });
        res = { status, json };
        req = {
            body: {},
            user: { _id: 'mockUserId' },
            app: {
                get: jest.fn().mockReturnValue({ emit: jest.fn() })
            } as any
        };
        jest.clearAllMocks();
    });

    it('should return 400 if title is missing', async () => {
        req.body = { description: 'test' };
        await createTask(req as Request, res as Response);
        expect(status).toHaveBeenCalledWith(400);
        expect(json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.any(String) }));
    });

    it('should create task if data is valid', async () => {
        req.body = { title: 'Test Task' };
        (Task.create as jest.Mock).mockResolvedValue({
            _id: 'taskId',
            title: 'Test Task',
            creatorId: 'mockUserId'
        });

        await createTask(req as Request, res as Response);

        expect(status).toHaveBeenCalledWith(201);
        expect(json).toHaveBeenCalledWith(expect.objectContaining({ title: 'Test Task' }));
    });

    it('should return 400 if title is too long', async () => {
        req.body = { title: 'a'.repeat(101) };
        await createTask(req as Request, res as Response);
        expect(status).toHaveBeenCalledWith(400);
    });
});
