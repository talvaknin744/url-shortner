import {container} from "../container";
import {AppDataSource} from '../data-source'
import {ILogger} from "../container";

const logger = container.resolve<ILogger>("logger");
const init = async () => {
    try {
        await AppDataSource.initialize()
        logger.info("successfully connected to DB");
    }
    catch (e) {
        logger.error(`error in initialize db: ${e}`)
    }
}


export { init };