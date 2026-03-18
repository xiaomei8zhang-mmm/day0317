import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ScheduleService } from './schedule.service';
import { CreateScheduleEventDto } from './dto/create-schedule-event.dto';
import { ListScheduleEventsDto } from './dto/list-schedule-events.dto';
import { UpdateScheduleStatusDto } from './dto/update-schedule-status.dto';

@ApiTags('schedule')
@Controller('schedule/events')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  @ApiOperation({ summary: '查询日程事件列表' })
  @ApiQuery({ name: 'status', required: false, enum: ['pending', 'completed', 'overdue'] })
  @ApiOkResponse({ description: '查询成功' })
  @ApiBadRequestResponse({ description: '参数校验失败' })
  list(@Query() query: ListScheduleEventsDto) {
    return this.scheduleService.listEvents(query);
  }

  @Post()
  @ApiOperation({ summary: '创建日程事件' })
  @ApiBody({ type: CreateScheduleEventDto })
  @ApiOkResponse({ description: '创建成功' })
  @ApiBadRequestResponse({ description: '参数校验失败' })
  create(@Body() payload: CreateScheduleEventDto) {
    return this.scheduleService.createEvent(payload);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: '更新日程事件状态' })
  @ApiParam({ name: 'id', type: Number, description: '事件ID' })
  @ApiBody({ type: UpdateScheduleStatusDto })
  @ApiOkResponse({ description: '更新成功' })
  @ApiBadRequestResponse({ description: '参数校验失败' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateScheduleStatusDto,
  ) {
    return this.scheduleService.updateStatus(id, payload);
  }
}
