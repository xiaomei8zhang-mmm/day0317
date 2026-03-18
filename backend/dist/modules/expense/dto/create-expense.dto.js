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
exports.CreateExpenseDto = exports.ExpenseCategory = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ExpenseCategory;
(function (ExpenseCategory) {
    ExpenseCategory["FOOD"] = "food";
    ExpenseCategory["DIAPER"] = "diaper";
    ExpenseCategory["CLOTHING"] = "clothing";
    ExpenseCategory["MEDICAL"] = "medical";
    ExpenseCategory["EDUCATION"] = "education";
    ExpenseCategory["TOY"] = "toy";
    ExpenseCategory["TRAVEL"] = "travel";
    ExpenseCategory["OTHER"] = "other";
})(ExpenseCategory || (exports.ExpenseCategory = ExpenseCategory = {}));
class CreateExpenseDto {
}
exports.CreateExpenseDto = CreateExpenseDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '孩子ID', example: 101 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateExpenseDto.prototype, "childId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '金额（元）', minimum: 0.01, example: 89 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    __metadata("design:type", Number)
], CreateExpenseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '消费分类', enum: ExpenseCategory, example: ExpenseCategory.DIAPER }),
    (0, class_validator_1.IsEnum)(ExpenseCategory),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '支付时间', example: '2026-03-15 11:08:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "paidAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '备注', example: '尿不湿L码' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "note", void 0);
//# sourceMappingURL=create-expense.dto.js.map