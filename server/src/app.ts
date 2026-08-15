import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Im running');
});

app.listen(port, () => {
  console.log(`GeoStats API listening in port: ${port} => http://localhost:${port}`);
});