"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dashboard_service_1 = require("./dashboard.service");
const get_dashboard_today_dto_1 = require("./dto/get-dashboard-today.dto");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    getToday(query, req) {
        return this.dashboardService.getToday(query, req);
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('today'),
    (0, swagger_1.ApiOperation)({ summary: '获取今日看板聚合数据' }),
    (0, swagger_1.ApiQuery)({ name: 'childId', required: false, description: '孩子ID', example: '101' }),
    (0, swagger_1.ApiQuery)({ name: 'city', required: false, description: '城市名', example: 'beijing' }),
    (0, swagger_1.ApiOkResponse)({
        description: '获取成功',
        schema: {
            example: {
                code: 0,
                message: 'ok',
                requestId: 'req_1773738329873',
                data: {
                    date: '2026-03-15',
                    child: { id: 101, name: '小米', stage: '1_3y' },
                    weather: { city: 'beijing', condition: '晴', temp: 11, feelLike: 9 },
                    outfit: { brand: '巴拉巴拉', suggestion: '内搭+外层防风' },
                    food: {
                        breakfast: '南瓜小米粥 + 蒸蛋',
                        lunch: '番茄牛肉面 + 西兰花',
                        dinner: '三文鱼粥 + 胡萝卜泥',
                    },
                    upcomingEvents: [{ id: 7001, title: '儿保复查', eventTime: '2026-03-17 10:00:00', daysLeft: 1 }],
                    nearbyTop: [{ id: 1, name: '朝阳公园亲子区', distanceKm: 2.1, indoor: false }],
                    expenseSummary: { monthTotal: 4865, budget: 5500, usageRate: 0.88 },
                },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '参数校验失败',
        schema: {
            example: {
                statusCode: 400,
                message: ['city must be a string'],
                error: 'Bad Request',
            },
        },
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_dashboard_today_dto_1.GetDashboardTodayDto, Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getToday", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('dashboard'),
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map