"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutfitService = void 0;
const common_1 = require("@nestjs/common");
let OutfitService = class OutfitService {
    getRecommendations(query) {
        const temperature = query.temperature ? Number(query.temperature) : 11;
        const rainProbability = query.rainProbability ? Number(query.rainProbability) : 20;
        const needWaterproof = rainProbability >= 60;
        const layers = temperature <= 8 ? ['内搭', '中层保暖', '外层防风'] : ['内搭', '外层防风'];
        return {
            weather: {
                temperature,
                rainProbability,
            },
            suggestion: {
                layers,
                needWaterproof,
                text: needWaterproof ? '建议防水外层，避免着凉。' : '建议透气防风外层，便于户外活动。',
            },
            brands: [
                {
                    name: '巴拉巴拉',
                    priceLevel: '中',
                    material: '棉+聚酯',
                    comfort: 4.6,
                    durability: 4.5,
                    careDifficulty: 2,
                },
                {
                    name: '优衣库童装',
                    priceLevel: '中',
                    material: '棉',
                    comfort: 4.5,
                    durability: 4.2,
                    careDifficulty: 1,
                },
                {
                    name: '迪卡侬儿童',
                    priceLevel: '中低',
                    material: '快干面料',
                    comfort: 4.2,
                    durability: 4.7,
                    careDifficulty: 1,
                },
            ],
        };
    }
};
exports.OutfitService = OutfitService;
exports.OutfitService = OutfitService = __decorate([
    (0, common_1.Injectable)()
], OutfitService);
//# sourceMappingURL=outfit.service.js.map