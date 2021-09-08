import { Application } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default class Environment {
    public static getConfig(): any {
        const port = process.env.PORT;
        const dbType = process.env.DB_TYPE;
        const dbHost = process.env.DB_HOST;
        const dbPort = process.env.DB_PORT;
        const dbName = process.env.DB_NAME;
        const dbUser = process.env.DB_USERNAME;
        const dbPassword = process.env.DB_PASSWORD;
        return {
            port,
            dbType,
            dbHost,
            dbPort,
            dbName,
            dbUser,
            dbPassword
        }
    }

    public init(express: Application): Application {
        express.locals.app = Environment.getConfig();
        return express;
    }
}