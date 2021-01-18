import bodyParser from 'body-parser';
import express from 'express';
import { join } from 'path';
import { useExpressServer } from 'routing-controllers';
import { createConnection } from 'typeorm';

import 'dotenv/config';
import 'reflect-metadata';

createConnection().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  useExpressServer(server, {
    controllers: [join(__dirname, 'app', 'controllers', '*.ts')],
  });

  server.listen(process.env.PORT || 3333, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
});
