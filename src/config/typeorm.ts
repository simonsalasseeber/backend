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
    DB_SSL
   } = process.env;


const config = {
 type: 'postgres',
 host: DB_HOST,
 port: DB_PORT || 5432,
 username: DB_USERNAME,
 password: DB_PASSWORD,
 database: DB_NAME,
 ssl: DB_SSL === 'true',
 extra: {
    ssl: 
        DB_SSL === 'true' ? {
            rejectUnauthorized: false,
        }
        : null,   
 },
 entities: ['dist/**/*.entity{.ts,.js}'],
 migrations: ['dist/migrations/*{.ts,.js}'],
 synchronize: false,
 logging: true,
 autoLoadEntities: true,
    dropSchema: false, // use this only in development
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions)