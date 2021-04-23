import Express from 'express';

const app = Express();
const port = process.env.PORT || 8080;

app.use('/', (req, res) => {
  res.json({ done: true });
});

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
