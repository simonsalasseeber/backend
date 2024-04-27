import { DataSource, DataSourceOptions } from "typeorm";
import {config as dotenvConfig } from 'dotenv';
import { registerAs } from "@nestjs/config";

dotenvConfig({path: '.development.env'});

const {
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
   } = process.env;

   const url = require('url');

// Suponiendo que DB_URL es tu variable de entorno con la URL de la base de datos
const dbUrl = process.env.DB_URL;

// Analiza la URL de la base de datos
const parsedUrl = url.parse(dbUrl);

// Extrae los componentes de la URL
const host = parsedUrl.hostname;
const deployedport = parsedUrl.port || 3000; 
const username = parsedUrl.auth.split(':')[0];
const password = parsedUrl.auth.split(':')[1];
const database = parsedUrl.pathname.substring(1);


const config = {
 type: 'postgres',
 host: host, // change for 'postgresdb'
 port: deployedport,
 username: username,
 password: password,
 database: database,
 entities: ['dist/**/*.entity{.ts,.js}'],
 migrations: ['dist/migrations/*{.ts,.js}'],
 synchronize: false,
 logging: true,
 autoLoadEntities: true,
    dropSchema: false, // use this only in development
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions)