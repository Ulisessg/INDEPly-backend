import Express from 'express';
import propertiesRoute from './components/properties/network';
import { config } from './config';

const app = Express();

app.use('/', propertiesRoute);

app.listen(config.port, () => {
  console.log(`Server running in http://localhost:${config.port}`);
});
