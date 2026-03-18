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
exports.VoiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const voice_service_1 = require("./voice.service");
const voice_parse_dto_1 = require("./dto/voice-parse.dto");
const voice_execute_dto_1 = require("./dto/voice-execute.dto");
let VoiceController = class VoiceController {
    constructor(voiceService) {
        this.voiceService = voiceService;
    }
    parse(payload) {
        return this.voiceService.parse(payload);
    }
    execute(payload) {
        return this.voiceService.execute(payload);
    }
};
exports.VoiceController = VoiceController;
__decorate([
    (0, common_1.Post)('parse'),
    (0, swagger_1.ApiOperation)({ summary: '语音文本解析' }),
    (0, swagger_1.ApiBody)({ type: voice_parse_dto_1.VoiceParseDto }),
    (0, swagger_1.ApiOkResponse)({ description: '解析成功' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: '参数校验失败' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [voice_parse_dto_1.VoiceParseDto]),
    __metadata("design:returntype", void 0)
], VoiceController.prototype, "parse", null);
__decorate([
    (0, common_1.Post)('execute'),
    (0, swagger_1.ApiOperation)({ summary: '执行语音意图' }),
    (0, swagger_1.ApiBody)({ type: voice_execute_dto_1.VoiceExecuteDto }),
    (0, swagger_1.ApiOkResponse)({ description: '执行成功' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: '参数校验失败' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [voice_execute_dto_1.VoiceExecuteDto]),
    __metadata("design:returntype", void 0)
], VoiceController.prototype, "execute", null);
exports.VoiceController = VoiceController = __decorate([
    (0, swagger_1.ApiTags)('voice'),
    (0, common_1.Controller)('voice'),
    __metadata("design:paramtypes", [voice_service_1.VoiceService])
], VoiceController);
//# sourceMappingURL=voice.controller.js.map