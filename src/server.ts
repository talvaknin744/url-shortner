import 'reflect-metadata';
import http from "http";
import {container} from './container';
import router from './app';
import {initDependencies} from './services';
import {ILogger, IServerConfig} from "./container";
import {AppDataSource} from "./data-source";


const server = http.createServer(router);
const serverConfig = container.resolve<IServerConfig>("serverConfig");
const logger = container.resolve<ILogger>("logger");

const port = serverConfig.port;

async function start(): Promise<void> {

    await initDependencies();
    server.listen(port, () => {
        logger.info(`server is running on port ${port}`);
    })

}

async function stop(): Promise<void> {
    await server.close();
    await AppDataSource.destroy();
}


if (require.main === module) {
    start().then(() =>
        logger.info("ok")
    );
} else {
    console.log('required as a module');
}

export {start, stop, server};


