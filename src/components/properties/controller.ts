/* eslint-disable class-methods-use-this */
import { dbConfig } from '../../config';
import propertyType from '../../types/propertyType';
import queryInfo from '../../utils/queryInfo';

const connectionConfig = {
  host: dbConfig.dbHost,
  port: dbConfig.dbPort,
  password: dbConfig.dbPassword,
  user: dbConfig.dbUsername,
  database: dbConfig.dbName,
};

class PropertiesController {
  getAllInfo(query: string): Promise<Array<propertyType | any>> {
    const config = {
      ...connectionConfig,
      query,
    };

    return queryInfo(config);
  }
}

export default PropertiesController;
