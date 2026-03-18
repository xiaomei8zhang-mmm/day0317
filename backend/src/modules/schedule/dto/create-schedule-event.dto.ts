import { ArrayNotEmpty, IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ScheduleEventType {
  VACCINE = 'vaccine',
  CHECKUP = 'checkup',
  SCHOOL = 'school',
  CUSTOM = 'custom',
}

export class CreateScheduleEventDto {
  @ApiPropertyOptional({ description: '孩子ID', example: 101 })
  @IsOptional()
  @IsNumber()
  childId?: number;

  @ApiProperty({ description: '事件类型', enum: ScheduleEventType, example: ScheduleEventType.CHECKUP })
  @IsEnum(ScheduleEventType)
  eventType!: ScheduleEventType;

  @ApiProperty({ description: '事件标题', example: '儿保复查' })
  @IsString()
  title!: string;

  @ApiProperty({ description: '事件时间', example: '2026-03-17 10:00:00' })
  @IsString()
  eventTime!: string;

  @ApiPropertyOptional({ description: '地点', example: '朝阳妇幼保健院' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ description: '备注', example: '携带疫苗本' })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: '提醒偏移（分钟）', type: [Number], example: [10080, 4320, 1440, 0] })
  @IsArray()
  @ArrayNotEmpty()
  remindOffsets!: number[];
}
