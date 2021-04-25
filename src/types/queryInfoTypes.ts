export interface paramsTypes {
  host: string;
  port: number;
  password: string;
  user: string;
  database: string;
  query: string;
}

export type returnType = Promise<Array<any> | Promise<{}> | any>;
