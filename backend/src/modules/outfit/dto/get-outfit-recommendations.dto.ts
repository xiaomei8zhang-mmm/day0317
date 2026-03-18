import { IsNumberString, IsOptional } from 'class-validator';

export class GetOutfitRecommendationsDto {
  @IsOptional()
  @IsNumberString()
  childId?: string;

  @IsOptional()
  @IsNumberString()
  temperature?: string;

  @IsOptional()
  @IsNumberString()
  rainProbability?: string;
}
