import { NextFunction, Request, Response } from 'express';
import { Route } from '../../utils';
import { getFullUrl, registerUrl } from './urlController';
import { HTTP400Error } from '../../utils/httpErrors';
import { z } from 'zod';

const UrlSchema = z.string().url();
const shortUrlSchema = z.string().min(8).max(8);

const routes: Route[] = [
    {
        path: '/registerUrl',
        method: 'post',
        handler: async (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!UrlSchema.safeParse(req.body.url))
                    throw new HTTP400Error(
                        'the supplied string is not a valid url'
                    );
                const shortUrl = await registerUrl(req.body.url);
                res.status(201).send({ shortUrl });
            } catch (e) {
                next(e);
            }
        },
    },
    {
        path: '/shortUrl/:url',
        method: 'get',
        handler: async (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!shortUrlSchema.safeParse(req.params.url).success)
                    throw new HTTP400Error(
                        'url param need to be string of eight characters'
                    );
                const fullUrl = await getFullUrl(req.params.url);
                res.redirect(fullUrl);
            } catch (e) {
                next(e);
            }
        },
    },
    {
        path: '/',
        method: 'get',
        handler: (req: Request, res: Response) => {
            res.send('hi').end();
        },
    },
];

export default routes;
