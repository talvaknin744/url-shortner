import { readFileSync } from 'fs';
import path from 'path';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

const swaggerDocument = readFileSync(
    path.join(__dirname, '..', 'config', 'swagger.json'),
    'utf-8'
);
export const handleApiDocs = (router: Router) => {
    router.use(
        '/docs',
        swaggerUi.serve,
        swaggerUi.setup(JSON.parse(swaggerDocument))
    );
};
