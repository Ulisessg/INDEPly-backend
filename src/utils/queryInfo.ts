import sql from 'mysql';
import { paramsTypes, returnType } from '../types/queryInfoTypes';

export default function queryInfo({
  port,
  user,
  password,
  database,
  host,
  query,
}: paramsTypes): returnType {
  return new Promise((resolve, reject) => {
    sql
      .createConnection({
        port,
        password,
        user,
        database,
        host,
      })
      .query(query, (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
  });
}
