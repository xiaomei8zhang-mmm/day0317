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
exports.RecommendController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const recommend_service_1 = require("./recommend.service");
const get_recommend_query_dto_1 = require("./dto/get-recommend-query.dto");
let RecommendController = class RecommendController {
    constructor(recommendService) {
        this.recommendService = recommendService;
    }
    getPlaces(query) {
        return this.recommendService.getPlaces(query);
    }
    getSchools(query) {
        return this.recommendService.getSchools(query);
    }
};
exports.RecommendController = RecommendController;
__decorate([
    (0, common_1.Get)('places'),
    (0, swagger_1.ApiOperation)({ summary: '兼容接口：获取附近玩乐推荐' }),
    (0, swagger_1.ApiQuery)({ name: 'city', required: false, description: '城市', example: 'beijing' }),
    (0, swagger_1.ApiQuery)({
        name: 'stage',
        required: false,
        description: '学段透传',
        enum: ['nursery_0_3', 'kindergarten_3_6', 'primary_6_12', 'middle_12_plus'],
    }),
    (0, swagger_1.ApiQuery)({ name: 'weather', required: false, description: '天气标识', example: 'sunny' }),
    (0, swagger_1.ApiQuery)({ name: 'aqi', required: false, description: '空气质量指数', example: '45' }),
    (0, swagger_1.ApiQuery)({ name: 'budget', required: false, description: '预算透传', example: '2000-5000/月' }),
    (0, swagger_1.ApiOkResponse)({ description: '获取成功（兼容层）' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: '参数校验失败' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_recommend_query_dto_1.GetRecommendQueryDto]),
    __metadata("design:returntype", void 0)
], RecommendController.prototype, "getPlaces", null);
__decorate([
    (0, common_1.Get)('schools'),
    (0, swagger_1.ApiOperation)({ summary: '兼容接口：获取附近学校推荐' }),
    (0, swagger_1.ApiQuery)({ name: 'city', required: false, description: '城市', example: 'beijing' }),
    (0, swagger_1.ApiQuery)({
        name: 'stage',
        required: false,
        description: '学段',
        enum: ['nursery_0_3', 'kindergarten_3_6', 'primary_6_12', 'middle_12_plus'],
    }),
    (0, swagger_1.ApiQuery)({ name: 'weather', required: false, description: '天气标识（兼容透传）', example: 'sunny' }),
    (0, swagger_1.ApiQuery)({ name: 'aqi', required: false, description: '空气质量指数（兼容透传）', example: '45' }),
    (0, swagger_1.ApiQuery)({ name: 'budget', required: false, description: '预算文本', example: '2000-5000/月' }),
    (0, swagger_1.ApiOkResponse)({ description: '获取成功（兼容层）' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: '参数校验失败' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_recommend_query_dto_1.GetRecommendQueryDto]),
    __metadata("design:returntype", void 0)
], RecommendController.prototype, "getSchools", null);
exports.RecommendController = RecommendController = __decorate([
    (0, swagger_1.ApiTags)('recommend-compat'),
    (0, common_1.Controller)('recommend'),
    __metadata("design:paramtypes", [recommend_service_1.RecommendService])
], RecommendController);
//# sourceMappingURL=recommend.controller.js.map