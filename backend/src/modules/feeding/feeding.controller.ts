import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FeedingService } from './feeding.service';
import { GetFeedingRecommendationsDto } from './dto/get-feeding-recommendations.dto';

@ApiTags('feeding')
@Controller('feeding')
export class FeedingController {
  constructor(private readonly feedingService: FeedingService) {}

  @Get('recommendations')
  @ApiOperation({ summary: '获取分龄吃法推荐' })
  @ApiQuery({ name: 'childId', required: false, description: '孩子ID', example: '101' })
  @ApiQuery({ name: 'date', required: false, description: '日期', example: '2026-03-15' })
  @ApiQuery({ name: 'allergens', required: false, description: '过敏原，逗号分隔', example: '花生,乳制品' })
  @ApiOkResponse({
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
  })
  @ApiBadRequestResponse({ description: '参数校验失败' })
  getRecommendations(@Query() query: GetFeedingRecommendationsDto) {
    return this.feedingService.getRecommendations(query);
  }
}
