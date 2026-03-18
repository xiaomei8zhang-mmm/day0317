import { IsIn, IsOptional } from 'class-validator';

export class ListScheduleEventsDto {
  @IsOptional()
  @IsIn(['pending', 'completed', 'overdue'])
  status?: 'pending' | 'completed' | 'overdue';
}
