import { IsOptional, IsString } from 'class-validator';

export class GetFeedingRecommendationsDto {
  @IsOptional()
  @IsString()
  childId?: string;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  allergens?: string;
}
