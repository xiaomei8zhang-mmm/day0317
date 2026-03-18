import { Controller, Get, Query, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { GetDashboardTodayDto } from './dto/get-dashboard-today.dto';
import { Request } from 'express';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('today')
  @ApiOperation({ summary: '获取今日看板聚合数据' })
  @ApiQuery({ name: 'childId', required: false, description: '孩子ID', example: '101' })
  @ApiQuery({ name: 'city', required: false, description: '城市名', example: 'beijing' })
  @ApiOkResponse({
    description: '获取成功',
    schema: {
      example: {
        code: 0,
        message: 'ok',
        requestId: 'req_1773738329873',
        data: {
          date: '2026-03-15',
          child: { id: 101, name: '小米', stage: '1_3y' },
          weather: { city: 'beijing', condition: '晴', temp: 11, feelLike: 9 },
          outfit: { brand: '巴拉巴拉', suggestion: '内搭+外层防风' },
          food: {
            breakfast: '南瓜小米粥 + 蒸蛋',
            lunch: '番茄牛肉面 + 西兰花',
            dinner: '三文鱼粥 + 胡萝卜泥',
          },
          upcomingEvents: [{ id: 7001, title: '儿保复查', eventTime: '2026-03-17 10:00:00', daysLeft: 1 }],
          nearbyTop: [{ id: 1, name: '朝阳公园亲子区', distanceKm: 2.1, indoor: false }],
          expenseSummary: { monthTotal: 4865, budget: 5500, usageRate: 0.88 },
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: '参数校验失败',
    schema: {
      example: {
        statusCode: 400,
        message: ['city must be a string'],
        error: 'Bad Request',
      },
    },
  })
  getToday(@Query() query: GetDashboardTodayDto, @Req() req: Request) {
    return this.dashboardService.getToday(query, req);
  }
}
