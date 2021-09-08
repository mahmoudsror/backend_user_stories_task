import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import Environment from './Environment';

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
            synchronize: false,
        } as any)
            .then((connection: Connection) => {
                console.log('info', `Connection to MySQL server established on port ${dbPort as string}`);
            })
            .catch((error: Error) => {
                console.log("error : ", error)
                process.stdout.write(`error: ${error.message}`);
                process.exit(1);
            });
    }
}