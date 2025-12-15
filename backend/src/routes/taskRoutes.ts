import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect); // All routes protected

router.route('/')
    .get(getTasks)
    .post(createTask);

router.route('/:id')
    .put(updateTask)
    .delete(deleteTask);

export default router;
