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
exports.VoiceParseDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class VoiceParseDto {
}
exports.VoiceParseDto = VoiceParseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '语音会话ID', example: 'voice_abc_001' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VoiceParseDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '识别后的文本', example: '这个月到目前花了多少钱' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VoiceParseDto.prototype, "text", void 0);
//# sourceMappingURL=voice-parse.dto.js.map