import { Application } from "express";
import tasksRoutes from '../routes/tasks';

class Routes {

    public loadTasksRoutes(app: Application): Application {
        return app.use('/task',tasksRoutes);
    }
}
export default new Routes();