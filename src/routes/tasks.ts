import { Router } from 'express';
import { TasksController } from '../controllers/TasksController';
const tasksController = new TasksController();
const router: Router = Router();

router.post('/',tasksController.create);

export default router;