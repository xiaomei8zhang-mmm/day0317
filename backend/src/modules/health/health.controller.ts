import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { HealthService } from './health.service';
import { GetHealthSummaryDto } from './dto/get-health-summary.dto';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Post('record')
  @ApiOperation({ summary: '新增健康记录' })
  @ApiBody({ type: CreateHealthRecordDto })
  @ApiOkResponse({ description: '创建成功' })
  @ApiBadRequestResponse({ description: '参数校验失败' })
  createRecord(@Body() payload: CreateHealthRecordDto) {
    return this.healthService.createRecord(payload);
  }

  @Get('summary')
  @ApiOperation({ summary: '获取健康汇总' })
  @ApiQuery({ name: 'childId', required: false, description: '孩子ID', example: '101' })
  @ApiOkResponse({ description: '查询成功' })
  @ApiBadRequestResponse({ description: '参数校验失败' })
  getSummary(@Query() query: GetHealthSummaryDto) {
    return this.healthService.getSummary(query);
  }
}
