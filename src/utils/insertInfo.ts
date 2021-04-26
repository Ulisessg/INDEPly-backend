import sql from 'mysql';

export default function queryInfo({
  port,
  user,
  password,
  database,
  host,
  query,
  data,
}: any) {
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
