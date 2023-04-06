import {container} from '../container';
import urlRoutes from "./urls/urlRoutes";
import {init as dbInit} from "./db";
import {ILogger} from "../container";


const logger = container.resolve<ILogger>("logger");
const initDependencies = async () => {
    await dbInit()
    logger.info("all dependencies inited succefully");
};

export { initDependencies };
export default [...urlRoutes]