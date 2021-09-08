import * as express from 'express';
import Environment from './Environment';

class Server {

    public express: express.Application;

    constructor() {
        this.express = express.default();
    }

    public init(): any {
        const port: number = Environment.getConfig().port;

        this.express.listen(port, () => {
            
            console.log(`Server started on port ${port}`);
        });
    }

}

export default new Server();