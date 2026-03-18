import { IsOptional, IsString } from 'class-validator';

export class GetDashboardTodayDto {
  @IsOptional()
  @IsString()
  childId?: string;

  @IsOptional()
  @IsString()
  city?: string;
}
