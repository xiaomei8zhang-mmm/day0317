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
exports.FeedingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const feeding_service_1 = require("./feeding.service");
const get_feeding_recommendations_dto_1 = require("./dto/get-feeding-recommendations.dto");
let FeedingController = class FeedingController {
    constructor(feedingService) {
        this.feedingService = feedingService;
    }
    getRecommendations(query) {
        return this.feedingService.getRecommendations(query);
    }
};
exports.FeedingController = FeedingController;
__decorate([
    (0, common_1.Get)('recommendations'),
    (0, swagger_1.ApiOperation)({ summary: '获取分龄吃法推荐' }),
    (0, swagger_1.ApiQuery)({ name: 'childId', required: false, description: '孩子ID', example: '101' }),
    (0, swagger_1.ApiQuery)({ name: 'date', required: false, description: '日期', example: '2026-03-15' }),
    (0, swagger_1.ApiQuery)({ name: 'allergens', required: false, description: '过敏原，逗号分隔', example: '花生,乳制品' }),
    (0, swagger_1.ApiOkResponse)({
        description: '获取成功',
        schema: {
            example: {
                code: 0,
                message: 'ok',
                requestId: 'req_xxx',
                data: {
                    childId: 101,
                    date: '2026-03-15',
                    stage: '1_3y',
                    allergens: ['花生'],
                    meals: {
                        breakfast: { name: '南瓜小米粥 + 蒸蛋', tags: ['易消化'], alternatives: ['山药鸡肉粥'] },
                        lunch: { name: '番茄牛肉面 + 西兰花', tags: ['高铁'], alternatives: ['番茄牛肉饭'] },
                        dinner: { name: '三文鱼粥 + 胡萝卜泥', tags: ['DHA'], alternatives: ['鸡肉蔬菜粥'] },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: '参数校验失败' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_feeding_recommendations_dto_1.GetFeedingRecommendationsDto]),
    __metadata("design:returntype", void 0)
], FeedingController.prototype, "getRecommendations", null);
exports.FeedingController = FeedingController = __decorate([
    (0, swagger_1.ApiTags)('feeding'),
    (0, common_1.Controller)('feeding'),
    __metadata("design:paramtypes", [feeding_service_1.FeedingService])
], FeedingController);
//# sourceMappingURL=feeding.controller.js.map