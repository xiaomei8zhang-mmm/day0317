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
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const health_service_1 = require("./health.service");
const get_health_summary_dto_1 = require("./dto/get-health-summary.dto");
const create_health_record_dto_1 = require("./dto/create-health-record.dto");
let HealthController = class HealthController {
    constructor(healthService) {
        this.healthService = healthService;
    }
    createRecord(payload) {
        return this.healthService.createRecord(payload);
    }
    getSummary(query) {
        return this.healthService.getSummary(query);
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Post)('record'),
    (0, swagger_1.ApiOperation)({ summary: '新增健康记录' }),
    (0, swagger_1.ApiBody)({ type: create_health_record_dto_1.CreateHealthRecordDto }),
    (0, swagger_1.ApiOkResponse)({ description: '创建成功' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: '参数校验失败' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_health_record_dto_1.CreateHealthRecordDto]),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "createRecord", null);
__decorate([
    (0, common_1.Get)('summary'),
    (0, swagger_1.ApiOperation)({ summary: '获取健康汇总' }),
    (0, swagger_1.ApiQuery)({ name: 'childId', required: false, description: '孩子ID', example: '101' }),
    (0, swagger_1.ApiOkResponse)({ description: '查询成功' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: '参数校验失败' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_health_summary_dto_1.GetHealthSummaryDto]),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "getSummary", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('health'),
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [health_service_1.HealthService])
], HealthController);
//# sourceMappingURL=health.controller.js.map