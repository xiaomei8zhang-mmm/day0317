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
exports.NearbyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nearby_service_1 = require("./nearby.service");
const get_nearby_places_dto_1 = require("./dto/get-nearby-places.dto");
const get_nearby_schools_dto_1 = require("./dto/get-nearby-schools.dto");
let NearbyController = class NearbyController {
    constructor(nearbyService) {
        this.nearbyService = nearbyService;
    }
    getPlaces(query) {
        return this.nearbyService.getPlaces(query);
    }
    getSchools(query) {
        return this.nearbyService.getSchools(query);
    }
};
exports.NearbyController = NearbyController;
__decorate([
    (0, common_1.Get)('places'),
    (0, swagger_1.ApiOperation)({ summary: '获取附近玩乐推荐' }),
    (0, swagger_1.ApiQuery)({ name: 'city', required: false, description: '城市', example: 'beijing' }),
    (0, swagger_1.ApiQuery)({ name: 'lat', required: false, description: '纬度', example: '39.92' }),
    (0, swagger_1.ApiQuery)({ name: 'lng', required: false, description: '经度', example: '116.46' }),
    (0, swagger_1.ApiQuery)({ name: 'weather', required: false, description: '天气标识', example: 'sunny' }),
    (0, swagger_1.ApiQuery)({ name: 'aqi', required: false, description: '空气质量指数', example: '45' }),
    (0, swagger_1.ApiOkResponse)({
        description: '获取成功',
        schema: {
            example: {
                code: 0,
                message: 'ok',
                requestId: 'req_xxx',
                data: {
                    city: 'beijing',
                    weatherMode: 'sunny_outdoor_first',
                    items: [{ id: 1, name: '朝阳公园亲子区', distanceKm: 2.1, indoor: false }],
                },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: '参数校验失败' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_nearby_places_dto_1.GetNearbyPlacesDto]),
    __metadata("design:returntype", void 0)
], NearbyController.prototype, "getPlaces", null);
__decorate([
    (0, common_1.Get)('schools'),
    (0, swagger_1.ApiOperation)({ summary: '获取附近学校推荐' }),
    (0, swagger_1.ApiQuery)({ name: 'city', required: false, description: '城市', example: 'beijing' }),
    (0, swagger_1.ApiQuery)({
        name: 'stage',
        required: false,
        description: '学段',
        enum: ['nursery_0_3', 'kindergarten_3_6', 'primary_6_12', 'middle_12_plus'],
    }),
    (0, swagger_1.ApiQuery)({ name: 'budget', required: false, description: '预算文本', example: '2000-5000/月' }),
    (0, swagger_1.ApiOkResponse)({
        description: '获取成功',
        schema: {
            example: {
                code: 0,
                message: 'ok',
                requestId: 'req_xxx',
                data: {
                    city: 'beijing',
                    stage: 'kindergarten_3_6',
                    compliance: { source: '教育主管部门公开信息+地图平台公开数据', updatedAt: '2026-03-15' },
                    items: [{ id: 3001, name: '京华幼儿园', distanceKm: 2.1 }],
                },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: '参数校验失败' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_nearby_schools_dto_1.GetNearbySchoolsDto]),
    __metadata("design:returntype", void 0)
], NearbyController.prototype, "getSchools", null);
exports.NearbyController = NearbyController = __decorate([
    (0, swagger_1.ApiTags)('nearby'),
    (0, common_1.Controller)('nearby'),
    __metadata("design:paramtypes", [nearby_service_1.NearbyService])
], NearbyController);
//# sourceMappingURL=nearby.controller.js.map