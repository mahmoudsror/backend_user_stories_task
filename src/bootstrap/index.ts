import Server from "./Server";
import { Database } from "./Database";
export default class Bootstrap {

    public static initServer() {
        Server.init();
    }

    public static initDatabase() {
        Database.connect();
    }
}