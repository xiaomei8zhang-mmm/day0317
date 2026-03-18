import { IsOptional, IsString } from 'class-validator';

export class GetHealthSummaryDto {
  @IsOptional()
  @IsString()
  childId?: string;
}
