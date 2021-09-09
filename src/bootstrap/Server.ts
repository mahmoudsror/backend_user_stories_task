import * as express from 'express';
import Environment from './Environment';
import Routes from './Routes';
import swaggerUi from "swagger-ui-express";
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
            this.app.use(
                "/docs",
                swaggerUi.serve,
                swaggerUi.setup(undefined, {
                  swaggerOptions: {
                    url: "/swagger.json",
                  },
                })
              );
            console.log(`Server started on port ${port}`);
        });
    }

}

export default new Server();