"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const loggers_middleware_1 = require("./middlewares/loggers.middleware");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(loggers_middleware_1.loggerGlobal);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map