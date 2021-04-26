/* eslint-disable class-methods-use-this */
import sql from 'mysql';
import {
  queryInfoProps,
  defaultReturn,
  insertInfoParams,
} from '../types/sqlActionsTypes';

class sqlActions {
  queryInfo({
    port,
    user,
    password,
    database,
    host,
    query,
  }: queryInfoProps): defaultReturn {
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

  insertInfo({
    port,
    user,
    password,
    database,
    host,
    query,
    data,
  }: insertInfoParams): defaultReturn {
    return new Promise((resolve, reject) => {
      sql
        .createConnection({
          port,
          password,
          user,
          database,
          host,
        })
        .query(query, data, (error, results) => {
          if (error) reject(error);
          resolve(results);
        });
    });
  }
}

export default sqlActions;
