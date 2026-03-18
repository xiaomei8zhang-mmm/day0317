import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateScheduleStatusDto {
  @ApiProperty({ description: '事件状态', enum: ['pending', 'completed', 'overdue'], example: 'completed' })
  @IsIn(['pending', 'completed', 'overdue'])
  status!: 'pending' | 'completed' | 'overdue';
}
