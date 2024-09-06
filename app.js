import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { transactionsRouter } from './routers/transactionsRouter.js';



function init() {
  const app = express();
  const port = 4000;

  app.use(cors());
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.send('Hello supabase');
  });

  app.use('/transactions', transactionsRouter);
 

  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '35mb',
      parameterLimit: 50000,
    })
  );

  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      res.status(400).json({ error: 'Invalid JSON payload' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

init();
