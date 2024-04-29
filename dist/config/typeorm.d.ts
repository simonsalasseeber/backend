import { DataSource } from "typeorm";
declare const _default: (() => {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl: boolean;
    extra: {
        ssl: {
            rejectUnauthorized: boolean;
        };
    };
    entities: string[];
    migrations: string[];
    synchronize: boolean;
    logging: boolean;
    autoLoadEntities: boolean;
    dropSchema: boolean;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl: boolean;
    extra: {
        ssl: {
            rejectUnauthorized: boolean;
        };
    };
    entities: string[];
    migrations: string[];
    synchronize: boolean;
    logging: boolean;
    autoLoadEntities: boolean;
    dropSchema: boolean;
}>;
export default _default;
export declare const connectionSource: DataSource;
