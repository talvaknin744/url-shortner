import path from 'path';
import convict from 'convict';
import jsonConfig from './development.json';
import swagger from './swagger.json';

const config = convict({
    env: {
        doc: 'The application environment',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
    },
    server: {
        port: {
            doc: 'the application port',
            format: 'port',
            default: '3000',
            env: 'PORT',
        },
    },
    db: {
        username: {
            doc: 'the db username',
            format: String,
            default: '',
            env: 'DB_USERNAME',
        },
        password: {
            doc: 'the db password',
            format: String,
            default: '',
            env: 'DB_PASSWORD',
        },
        database: {
            doc: 'the table to work on',
            format: String,
            default: '',
            env: 'DB_TABLE',
        },
    },
    log: {
        level: {
            doc: 'the application logging level',
            format: ['info', 'debug'],
            default: 'info',
            env: 'LOG_LEVEL',
        },
        writeToFile: {
            doc: 'if to write logs to file or not',
            format: Boolean,
            default: false,
            env: 'WRITE_TO_FILE',
        },
        logFilePath: {
            doc: 'where to write the logs to if writeToFile is true ',
            format: String,
            default: '',
            env: 'LOGS_FILE_PATH',
        },
    },
});

const env = config.get('env');
const pathToConfig = path.join(__dirname, env + '.json');
config.loadFile(pathToConfig);
config.validate({ allowed: 'strict' });

export default config;
