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
exports.ScheduleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const schedule_service_1 = require("./schedule.service");
const create_schedule_event_dto_1 = require("./dto/create-schedule-event.dto");
const list_schedule_events_dto_1 = require("./dto/list-schedule-events.dto");
const update_schedule_status_dto_1 = require("./dto/update-schedule-status.dto");
let ScheduleController = class ScheduleController {
    constructor(scheduleService) {
        this.scheduleService = scheduleService;
    }
    list(query) {
        return this.scheduleService.listEvents(query);
    }
    create(payload) {
        return this.scheduleService.createEvent(payload);
    }
    updateStatus(id, payload) {
        return this.scheduleService.updateStatus(id, payload);
    }
};
exports.ScheduleController = ScheduleController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '查询日程事件列表' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['pending', 'completed', 'overdue'] }),
    (0, swagger_1.ApiOkResponse)({ description: '查询成功' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: '参数校验失败' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_schedule_events_dto_1.ListScheduleEventsDto]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '创建日程事件' }),
    (0, swagger_1.ApiBody)({ type: create_schedule_event_dto_1.CreateScheduleEventDto }),
    (0, swagger_1.ApiOkResponse)({ description: '创建成功' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: '参数校验失败' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_schedule_event_dto_1.CreateScheduleEventDto]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: '更新日程事件状态' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: '事件ID' }),
    (0, swagger_1.ApiBody)({ type: update_schedule_status_dto_1.UpdateScheduleStatusDto }),
    (0, swagger_1.ApiOkResponse)({ description: '更新成功' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: '参数校验失败' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_schedule_status_dto_1.UpdateScheduleStatusDto]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "updateStatus", null);
exports.ScheduleController = ScheduleController = __decorate([
    (0, swagger_1.ApiTags)('schedule'),
    (0, common_1.Controller)('schedule/events'),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService])
], ScheduleController);
//# sourceMappingURL=schedule.controller.js.map