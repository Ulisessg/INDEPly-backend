// Query info types

export interface queryInfoProps {
  host: string;
  port: number;
  password: string;
  user: string;
  database: string;
  query: string;
}

export type defaultReturn = Promise<Array<any> | Promise<{}> | any>;

// Insert info types

export interface insertInfoParams extends queryInfoProps {
  data: any;
}
