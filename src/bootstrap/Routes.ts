import { Application } from "express";
import tasksRoutes from '../routes/tasks';
import userRoutes from '../routes/users';
class Routes {

    public loadTasksRoutes(app: Application): Application {
        return app.use('/task',tasksRoutes);
    }

    public loadUsersRoutes(app: Application): Application {
        return app.use('/user',userRoutes);
    }
}
export default new Routes();