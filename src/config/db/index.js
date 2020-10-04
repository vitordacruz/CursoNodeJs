const { Pool } = require("pg");

console.log('Usuario: ' + process.env.DB_USER);
console.log('process.env.DB_HOST: ' + process.env.DB_HOST);
console.log('process.env.DB_PORT: ' + Number(process.env.DB_PORT));

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  });
  
  module.exports = pool;