"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
(0, dotenv_1.config)({ path: '.development.env' });
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, } = process.env;
const port = Number(DB_PORT);
const config = {
    type: 'postgres',
    host: DB_HOST,
    port: port,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    synchronize: true,
    logging: true,
    autoLoadEntities: true,
    dropSchema: true,
};
exports.default = (0, config_1.registerAs)('typeorm', () => config);
exports.connectionSource = new typeorm_1.DataSource(config);
//# sourceMappingURL=typeorm.js.map