import env from 'dotenv';

env.config();

export const config = {
  port: process.env.PORT || 8080,
};

export const dbConfig = {
  dbHost: process.env.ENDPOINT || '',
  dbPort: process.env.DB_PORT || '',
  dbUsername: process.env.USERNAME || '',
  dbPassword: process.env.PASSWORD || '',
  dbName: process.env.DATABASE_NAME || '',
};
