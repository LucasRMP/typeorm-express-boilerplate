import { config as configEnv } from 'dotenv';
import 'reflect-metadata';

import app from './app';

configEnv();

app.listen(process.env.PORT || 3333);
