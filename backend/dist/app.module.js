"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const expense_module_1 = require("./modules/expense/expense.module");
const feeding_module_1 = require("./modules/feeding/feeding.module");
const health_module_1 = require("./modules/health/health.module");
const nearby_module_1 = require("./modules/nearby/nearby.module");
const outfit_module_1 = require("./modules/outfit/outfit.module");
const recommend_module_1 = require("./modules/recommend/recommend.module");
const schedule_module_1 = require("./modules/schedule/schedule.module");
const voice_module_1 = require("./modules/voice/voice.module");
const typeorm_config_1 = require("./config/typeorm.config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: (() => {
            const baseModules = [
                config_1.ConfigModule.forRoot({ isGlobal: true }),
                dashboard_module_1.DashboardModule,
                expense_module_1.ExpenseModule,
                feeding_module_1.FeedingModule,
                health_module_1.HealthModule,
                nearby_module_1.NearbyModule,
                outfit_module_1.OutfitModule,
                recommend_module_1.RecommendModule,
                schedule_module_1.ScheduleModule,
                voice_module_1.VoiceModule,
            ];
            const dbDisabled = process.env.DISABLE_DB === 'true';
            if (dbDisabled)
                return baseModules;
            return [
                config_1.ConfigModule.forRoot({ isGlobal: true }),
                typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeOrmConfig),
                dashboard_module_1.DashboardModule,
                expense_module_1.ExpenseModule,
                feeding_module_1.FeedingModule,
                health_module_1.HealthModule,
                nearby_module_1.NearbyModule,
                outfit_module_1.OutfitModule,
                recommend_module_1.RecommendModule,
                schedule_module_1.ScheduleModule,
                voice_module_1.VoiceModule,
            ];
        })(),
    })
], AppModule);
//# sourceMappingURL=app.module.js.map