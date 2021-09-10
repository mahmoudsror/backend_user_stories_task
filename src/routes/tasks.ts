import { Router } from 'express';
import { TasksController } from '../controllers/TasksController';
const tasksController = new TasksController();
const router: Router = Router();

router.post('/',tasksController.create);
router.put('/:id/status',tasksController.changeStatus);
router.put('/:id/assign',tasksController.assign);
export default router;