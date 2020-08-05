import { createConnection } from 'typeorm';

import config from '@config/database';

async function createDefaultConnection() {
  const connection = await createConnection();
  return connection;
}

export const connection = createConnection({
  ...config,
});

export default createDefaultConnection;
