import Express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import propertiesRoute from './components/properties/network';
import { config } from './config';

const app = Express();

app.use(helmet());

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/', propertiesRoute);

app.listen(config.port, () => {
  console.log(`Server running in http://localhost:${config.port}`);
});
