import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { OutfitService } from './outfit.service';
import { GetOutfitRecommendationsDto } from './dto/get-outfit-recommendations.dto';

@ApiTags('outfit')
@Controller('outfit')
export class OutfitController {
  constructor(private readonly outfitService: OutfitService) {}

  @Get('recommendations')
  @ApiOperation({ summary: '获取穿搭推荐' })
  @ApiQuery({ name: 'childId', required: false, description: '孩子ID', example: '101' })
  @ApiQuery({ name: 'temperature', required: false, description: '温度（摄氏度）', example: '11' })
  @ApiQuery({ name: 'rainProbability', required: false, description: '降水概率（0-100）', example: '20' })
  @ApiOkResponse({
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
  })
  @ApiBadRequestResponse({ description: '参数校验失败' })
  getRecommendations(@Query() query: GetOutfitRecommendationsDto) {
    return this.outfitService.getRecommendations(query);
  }
}
