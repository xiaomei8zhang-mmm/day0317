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
exports.CreateHealthRecordDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateHealthRecordDto {
}
exports.CreateHealthRecordDto = CreateHealthRecordDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '孩子ID', example: 101 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateHealthRecordDto.prototype, "childId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '记录时间', example: '2026-03-16 08:30:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHealthRecordDto.prototype, "recordTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '体重（kg）', minimum: 1, maximum: 50, example: 13.5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Number)
], CreateHealthRecordDto.prototype, "weightKg", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '身高（cm）', minimum: 30, maximum: 220, example: 90.3 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(30),
    (0, class_validator_1.Max)(220),
    __metadata("design:type", Number)
], CreateHealthRecordDto.prototype, "heightCm", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '体温（°C）', minimum: 34, maximum: 43, example: 37.2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(34),
    (0, class_validator_1.Max)(43),
    __metadata("design:type", Number)
], CreateHealthRecordDto.prototype, "temperatureC", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '睡眠时长（小时）', minimum: 0, maximum: 24, example: 10.4 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(24),
    __metadata("design:type", Number)
], CreateHealthRecordDto.prototype, "sleepHours", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '备注', example: '状态良好' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHealthRecordDto.prototype, "note", void 0);
//# sourceMappingURL=create-health-record.dto.js.map