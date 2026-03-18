import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHealthRecordDto {
  @ApiPropertyOptional({ description: '孩子ID', example: 101 })
  @IsOptional()
  @IsNumber()
  childId?: number;

  @ApiProperty({ description: '记录时间', example: '2026-03-16 08:30:00' })
  @IsString()
  recordTime!: string;

  @ApiPropertyOptional({ description: '体重（kg）', minimum: 1, maximum: 50, example: 13.5 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(50)
  weightKg?: number;

  @ApiPropertyOptional({ description: '身高（cm）', minimum: 30, maximum: 220, example: 90.3 })
  @IsOptional()
  @IsNumber()
  @Min(30)
  @Max(220)
  heightCm?: number;

  @ApiPropertyOptional({ description: '体温（°C）', minimum: 34, maximum: 43, example: 37.2 })
  @IsOptional()
  @IsNumber()
  @Min(34)
  @Max(43)
  temperatureC?: number;

  @ApiPropertyOptional({ description: '睡眠时长（小时）', minimum: 0, maximum: 24, example: 10.4 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(24)
  sleepHours?: number;

  @ApiPropertyOptional({ description: '备注', example: '状态良好' })
  @IsOptional()
  @IsString()
  note?: string;
}
