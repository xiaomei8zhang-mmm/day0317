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
exports.OutfitController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const outfit_service_1 = require("./outfit.service");
const get_outfit_recommendations_dto_1 = require("./dto/get-outfit-recommendations.dto");
let OutfitController = class OutfitController {
    constructor(outfitService) {
        this.outfitService = outfitService;
    }
    getRecommendations(query) {
        return this.outfitService.getRecommendations(query);
    }
};
exports.OutfitController = OutfitController;
__decorate([
    (0, common_1.Get)('recommendations'),
    (0, swagger_1.ApiOperation)({ summary: '获取穿搭推荐' }),
    (0, swagger_1.ApiQuery)({ name: 'childId', required: false, description: '孩子ID', example: '101' }),
    (0, swagger_1.ApiQuery)({ name: 'temperature', required: false, description: '温度（摄氏度）', example: '11' }),
    (0, swagger_1.ApiQuery)({ name: 'rainProbability', required: false, description: '降水概率（0-100）', example: '20' }),
    (0, swagger_1.ApiOkResponse)({
        description: '获取成功',
        schema: {
            example: {
                code: 0,
                message: 'ok',
                requestId: 'req_xxx',
                data: {
                    weather: { temperature: 11, rainProbability: 20 },
                    suggestion: { layers: ['内搭', '外层防风'], needWaterproof: false },
                    brands: [{ name: '巴拉巴拉', comfort: 4.6 }],
                },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: '参数校验失败' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_outfit_recommendations_dto_1.GetOutfitRecommendationsDto]),
    __metadata("design:returntype", void 0)
], OutfitController.prototype, "getRecommendations", null);
exports.OutfitController = OutfitController = __decorate([
    (0, swagger_1.ApiTags)('outfit'),
    (0, common_1.Controller)('outfit'),
    __metadata("design:paramtypes", [outfit_service_1.OutfitService])
], OutfitController);
//# sourceMappingURL=outfit.controller.js.map