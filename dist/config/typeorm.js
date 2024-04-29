"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
(0, dotenv_1.config)({ path: '.development.env' });
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_SSL } = process.env;
const config = {
    type: 'postgres',
    host: 'dpg-comm9nsf7o1s73f72j30-a.frankfurt-postgres.render.com',
    port: 5432,
    username: 'admin',
    password: 'QG6LAqL53PxabMz2UN8oRgQmIJo4UGrT',
    database: 'pihenrysimon_vzr0',
    ssl: DB_SSL === 'true',
    extra: {
        ssl: DB_SSL === 'true' ? {
            rejectUnauthorized: false,
        }
            : null,
    },
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    synchronize: false,
    logging: true,
    autoLoadEntities: true,
    dropSchema: false,
};
exports.default = (0, config_1.registerAs)('typeorm', () => config);
exports.connectionSource = new typeorm_1.DataSource(config);
//# sourceMappingURL=typeorm.js.map