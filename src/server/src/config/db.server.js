'use strict';

const path = require('path');
const mypath = path.resolve(process.cwd(), 'src' , '.env')
require('dotenv').config({ path: mypath});

// console.log(process.env.DB_PORT, mypath)

module.exports = {
  development: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
    // dialectOptions: {
    //   useUTC: false,
    //   timezone: 'Etc/GMT+3',
    // },
    logging: false, // console.log,
  },
  production: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
    // dialectOptions: {
    //   useUTC: false,
    //   timezone: 'Etc/GMT+3',
    // },
    logging: false,
  },
  test: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
    // dialectOptions: {
    //   useUTC: false,
    //   timezone: 'Etc/GMT+3',
    // },
    logging: false,
  },
};