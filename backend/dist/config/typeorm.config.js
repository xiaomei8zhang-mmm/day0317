"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const toNumber = (value, fallback) => {
    if (!value)
        return fallback;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? fallback : parsed;
};
exports.typeOrmConfig = {
    type: 'mysql',
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: toNumber(process.env.MYSQL_PORT, 3306),
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'parenting_app',
    autoLoadEntities: true,
    synchronize: false,
    logging: process.env.NODE_ENV !== 'production',
};
//# sourceMappingURL=typeorm.config.js.map