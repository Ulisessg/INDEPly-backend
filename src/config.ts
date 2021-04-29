import env from 'dotenv';

env.config();

export const config = {
  port: process.env.PORT || 3000,
};

export const auth = {
  email: process.env.EMAIL,
  emailPassword: process.env.EMAIL_PASSWORD,
};

export const dbConfig = {
  dbHost: process.env.ENDPOINT || '',
  dbPort: parseInt(<string>process.env.DB_PORT, 10),
  dbUsername: process.env.USERNAME || '',
  dbPassword: process.env.PASSWORD || '',
  dbName: process.env.DATABASE_NAME || '',
};
