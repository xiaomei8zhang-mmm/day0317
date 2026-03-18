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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateScheduleEventDto = exports.ScheduleEventType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ScheduleEventType;
(function (ScheduleEventType) {
    ScheduleEventType["VACCINE"] = "vaccine";
    ScheduleEventType["CHECKUP"] = "checkup";
    ScheduleEventType["SCHOOL"] = "school";
    ScheduleEventType["CUSTOM"] = "custom";
})(ScheduleEventType || (exports.ScheduleEventType = ScheduleEventType = {}));
class CreateScheduleEventDto {
}
exports.CreateScheduleEventDto = CreateScheduleEventDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '孩子ID', example: 101 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateScheduleEventDto.prototype, "childId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '事件类型', enum: ScheduleEventType, example: ScheduleEventType.CHECKUP }),
    (0, class_validator_1.IsEnum)(ScheduleEventType),
    __metadata("design:type", String)
], CreateScheduleEventDto.prototype, "eventType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '事件标题', example: '儿保复查' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateScheduleEventDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '事件时间', example: '2026-03-17 10:00:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateScheduleEventDto.prototype, "eventTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '地点', example: '朝阳妇幼保健院' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateScheduleEventDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '备注', example: '携带疫苗本' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateScheduleEventDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '提醒偏移（分钟）', type: [Number], example: [10080, 4320, 1440, 0] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], CreateScheduleEventDto.prototype, "remindOffsets", void 0);
//# sourceMappingURL=create-schedule-event.dto.js.map