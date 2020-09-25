const development = {
  database: process.env.DB_NAME || 'social_media_dev',
  username: process.env.DB_USER || 'myspace_tom',
  password: process.env.DB_PASS || 'supersecret',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  dialect: 'postgres',
};

const testing = {
  database: process.env.DB_NAME || 'social_media_test',
  username: process.env.DB_USER || 'myspace_tom',
  password: process.env.DB_PASS || 'supersecret',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  dialect: 'postgres',
};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  dialect: 'postgres',
};

module.exports = {
  development,
  testing,
  production,
};
