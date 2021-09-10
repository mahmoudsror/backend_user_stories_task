import * as express from 'express';
import Environment from './Environment';
import Routes from './Routes';
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from '../docs/swagger.json';
class Server {

    public app: express.Application;

    constructor() {
        this.app = express.default();
    }

    public init(): any {
        const port: number = Environment.getConfig().port;

        return this.app.listen(port, () => {
            this.app.use(express.urlencoded({ extended: true }));

            this.app.use(express.json());
            Routes.loadTasksRoutes(this.app);
            Routes.loadUsersRoutes(this.app);
            this.app.use(
                "/docs",
                swaggerUi.serve,
                swaggerUi.setup(swaggerDocument)
              );
            console.log(`Server started on port ${port}`);
        });
    }

}

export default new Server();