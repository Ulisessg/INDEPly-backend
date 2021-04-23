import Express from 'express';
import Store from './store/store';

const str = new Store('aaa');
const app = Express();
const port = process.env.PORT || 8080;

app.use('/', (req, res) => {
  str.insert({ a: 12 });

  res.json(str.getAll());
});

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
