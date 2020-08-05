import express from 'express';

import routes from './routes';
import './database';

const app = express();

app.use(express.json());
app.use('/v1', routes);

export default app;
