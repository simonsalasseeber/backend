import { DataSource, DataSourceOptions } from "typeorm";
import {config as dotenvConfig } from 'dotenv';
import { registerAs } from "@nestjs/config";

dotenvConfig({path: '.development.env'});

const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    //migrations
    synchronize: true,
    logging: true
}

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions)