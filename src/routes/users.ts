import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';
const usersController = new UsersController();
const router: Router = Router();

router.post('/',usersController.create);
export default router;