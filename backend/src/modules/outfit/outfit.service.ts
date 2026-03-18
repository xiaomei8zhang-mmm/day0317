import { Injectable } from '@nestjs/common';
import { GetOutfitRecommendationsDto } from './dto/get-outfit-recommendations.dto';

@Injectable()
export class OutfitService {
  getRecommendations(query: GetOutfitRecommendationsDto) {
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
}
