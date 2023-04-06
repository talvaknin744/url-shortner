import { DataSource} from 'typeorm'
import {Url} from './services/urls/urlModel.entity'
import {container} from "tsyringe";
import {IDB} from "./container";

const dbConfig = container.resolve<IDB>("dbConfig");
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: true,
    logging: true,
    entities: [
        Url
    ]
})