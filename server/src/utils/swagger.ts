import { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../../swagger.json';

function swaggerDocs(app: Express) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

export { swaggerDocs };
