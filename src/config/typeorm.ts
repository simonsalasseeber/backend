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

// // Suponiendo que DB_URL es tu variable de entorno con la URL de la base de datos
// const dbUrl = process.env.DB_URL;

// const url = require('url');
// const parsedUrl = url.parse(dbUrl);
// const port = parsedUrl.port || 3000; 

const config = {
 type: 'postgres',
 host: DB_HOST,
 port: parseInt(DB_PORT) || 3000,
 username: DB_USERNAME,
 password: DB_PASSWORD,
 database: DB_NAME,
 entities: ['dist/**/*.entity{.ts,.js}'],
 migrations: ['dist/migrations/*{.ts,.js}'],
 synchronize: false,
 logging: true,
 autoLoadEntities: true,
    dropSchema: false, // use this only in development
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions)