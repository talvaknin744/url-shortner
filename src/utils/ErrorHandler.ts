import { Response, NextFunction } from 'express';
import { HttpClientError, HTTP404Error } from './httpErrors';
import { ILogger, container } from '../container';

const logger = container.resolve<ILogger>('logger');

export const notFoundError = () => {
    logger.info('resource not found');
    throw new HTTP404Error('resource not found');
};

export const clientError = (err: Error, res: Response, next: NextFunction) => {
    if (err instanceof HttpClientError) {
        const { message, statusCode } = err;
        logger.error(message);
        res.status(statusCode).send(message);
    } else {
        next(err);
    }
};

export const serverError = (err: Error, res: Response) => {
    logger.error(err.message);
    if (process.env.NODE_ENV === 'production') {
        res.status(500).send('Internal Server Error');
    } else {
        res.status(500).send(err.stack);
    }
};
