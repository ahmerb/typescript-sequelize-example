import express from 'express';
import { Request, Response } from 'express';

const app: express.Application = express();

const sequelizeConfig = require('./config/sequelizeConfig.json');

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'hello, world' });
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
