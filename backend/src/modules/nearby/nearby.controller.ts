import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { NearbyService } from './nearby.service';
import { GetNearbyPlacesDto } from './dto/get-nearby-places.dto';
import { GetNearbySchoolsDto } from './dto/get-nearby-schools.dto';

@ApiTags('nearby')
@Controller('nearby')
export class NearbyController {
  constructor(private readonly nearbyService: NearbyService) {}

  @Get('places')
  @ApiOperation({ summary: '获取附近玩乐推荐' })
  @ApiQuery({ name: 'city', required: false, description: '城市', example: 'beijing' })
  @ApiQuery({ name: 'lat', required: false, description: '纬度', example: '39.92' })
  @ApiQuery({ name: 'lng', required: false, description: '经度', example: '116.46' })
  @ApiQuery({ name: 'weather', required: false, description: '天气标识', example: 'sunny' })
  @ApiQuery({ name: 'aqi', required: false, description: '空气质量指数', example: '45' })
  @ApiOkResponse({
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
  })
  @ApiBadRequestResponse({ description: '参数校验失败' })
  getPlaces(@Query() query: GetNearbyPlacesDto) {
    return this.nearbyService.getPlaces(query);
  }

  @Get('schools')
  @ApiOperation({ summary: '获取附近学校推荐' })
  @ApiQuery({ name: 'city', required: false, description: '城市', example: 'beijing' })
  @ApiQuery({
    name: 'stage',
    required: false,
    description: '学段',
    enum: ['nursery_0_3', 'kindergarten_3_6', 'primary_6_12', 'middle_12_plus'],
  })
  @ApiQuery({ name: 'budget', required: false, description: '预算文本', example: '2000-5000/月' })
  @ApiOkResponse({
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
  })
  @ApiBadRequestResponse({ description: '参数校验失败' })
  getSchools(@Query() query: GetNearbySchoolsDto) {
    return this.nearbyService.getSchools(query);
  }
}
