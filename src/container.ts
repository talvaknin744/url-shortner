import {container} from 'tsyringe';
import {createLogger} from "./packages/logger";
import config   from "./config/configLoader"

const configProps = config.getProperties();

export type IServerConfig = typeof configProps.server;
export type ILogger = typeof logger;
export type ILogsConfig = typeof configProps.log;
export type IDB = typeof configProps.db;

const logger = createLogger(config.get("log"));

container.register<IServerConfig>("serverConfig", { useValue: config.get("server")} );
container.register<ILogsConfig>("logConfig", { useValue: config.get("log")});
container.register<ILogger>("logger", { useValue: logger});
container.register<IDB>("dbConfig", { useValue: config.get("db")});

export { container }


