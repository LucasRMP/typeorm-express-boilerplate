import express from 'express';
import { createConnection } from 'typeorm';
import 'dotenv/config';
import 'reflect-metadata';

import routes from './routes';

createConnection().then(() => {
  const app = express();

  app.use(express.json());
  app.use('/v1', routes);

  app.listen(process.env.PORT || 3333, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
});
