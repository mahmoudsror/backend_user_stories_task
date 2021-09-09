import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Environment from './Environment';
import { Users } from '../entities/Users';
import { Tasks } from '../entities/Tasks';
import { TasksHistory } from '../entities/TasksHistory';
export class Database {

    constructor() { }
    static connect(): void {
        const { dbType, dbHost, dbPort, dbName, dbUser, dbPassword } = Environment.getConfig();
        createConnection({
            type: dbType,
            host: dbHost,
            port: dbPort,
            username: dbUser,
            password: dbPassword,
            database: dbName,
            synchronize: true,
            entities: [Users, Tasks, TasksHistory],
        } as any)
            .then(() => {
                console.log('info', `Connection to MySQL server established on port ${dbPort as string}`);
            })
            .catch((error: Error) => {
                console.log("error : ", error)
                process.stdout.write(`error: ${error.message}`);
                process.exit(1);
            });
    }
}