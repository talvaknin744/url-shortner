import Pino from "pino";
import * as fs from 'fs';
import pinoMultiStream from 'pino-multi-stream'

type LogConfig = {
    level: string,
    writeToFile: boolean,
    logFilePath: string
}

export const createLogger = (logConfig: LogConfig): Pino.Logger => {
    const streams: ({stream: NodeJS.WriteStream & {fd: 1}} | {stream: fs.WriteStream})[]  = [
        {stream: process.stdout}];

    if (logConfig.writeToFile) streams.push({stream: fs.createWriteStream(logConfig.logFilePath, {flags: 'a'})})

    const options = {
        level: logConfig.level,
        timestamp: Pino.stdTimeFunctions.isoTime,
        base: null
    }

    return Pino(options, pinoMultiStream.multistream(streams));
}