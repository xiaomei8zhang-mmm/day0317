import { IsIn, IsOptional } from 'class-validator';

export class GetExpenseSummaryDto {
  @IsOptional()
  @IsIn(['month', 'quarter', 'year'])
  range?: 'month' | 'quarter' | 'year';
}
