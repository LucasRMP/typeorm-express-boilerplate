import { ConnectionOptions } from 'typeorm';

import { asNumber } from '@utils/parsers';

const config: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: asNumber(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'docker',
  database: process.env.DB_NAME || 'typeorm',
};

export default config;
