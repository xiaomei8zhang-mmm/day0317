import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RecommendService } from './recommend.service';
import { GetRecommendQueryDto } from './dto/get-recommend-query.dto';

@ApiTags('recommend-compat')
@Controller('recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @Get('places')
  @ApiOperation({ summary: '兼容接口：获取附近玩乐推荐' })
  @ApiQuery({ name: 'city', required: false, description: '城市', example: 'beijing' })
  @ApiQuery({
    name: 'stage',
    required: false,
    description: '学段透传',
    enum: ['nursery_0_3', 'kindergarten_3_6', 'primary_6_12', 'middle_12_plus'],
  })
  @ApiQuery({ name: 'weather', required: false, description: '天气标识', example: 'sunny' })
  @ApiQuery({ name: 'aqi', required: false, description: '空气质量指数', example: '45' })
  @ApiQuery({ name: 'budget', required: false, description: '预算透传', example: '2000-5000/月' })
  @ApiOkResponse({ description: '获取成功（兼容层）' })
  @ApiBadRequestResponse({ description: '参数校验失败' })
  getPlaces(@Query() query: GetRecommendQueryDto) {
    return this.recommendService.getPlaces(query);
  }

  @Get('schools')
  @ApiOperation({ summary: '兼容接口：获取附近学校推荐' })
  @ApiQuery({ name: 'city', required: false, description: '城市', example: 'beijing' })
  @ApiQuery({
    name: 'stage',
    required: false,
    description: '学段',
    enum: ['nursery_0_3', 'kindergarten_3_6', 'primary_6_12', 'middle_12_plus'],
  })
  @ApiQuery({ name: 'weather', required: false, description: '天气标识（兼容透传）', example: 'sunny' })
  @ApiQuery({ name: 'aqi', required: false, description: '空气质量指数（兼容透传）', example: '45' })
  @ApiQuery({ name: 'budget', required: false, description: '预算文本', example: '2000-5000/月' })
  @ApiOkResponse({ description: '获取成功（兼容层）' })
  @ApiBadRequestResponse({ description: '参数校验失败' })
  getSchools(@Query() query: GetRecommendQueryDto) {
    return this.recommendService.getSchools(query);
  }
}
