import express from 'express';
import '@controllers/UserController';

const app = express();

app.get('/', (req, res) => res.status(200).json({ hello: 'world' }));

app.listen(process.env.PORT || 3333);
