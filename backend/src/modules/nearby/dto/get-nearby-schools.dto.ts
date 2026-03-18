import { IsIn, IsOptional, IsString } from 'class-validator';

export class GetNearbySchoolsDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsIn(['nursery_0_3', 'kindergarten_3_6', 'primary_6_12', 'middle_12_plus'])
  stage?: 'nursery_0_3' | 'kindergarten_3_6' | 'primary_6_12' | 'middle_12_plus';

  @IsOptional()
  @IsString()
  budget?: string;
}
