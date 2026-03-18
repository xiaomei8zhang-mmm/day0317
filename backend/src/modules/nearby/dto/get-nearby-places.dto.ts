import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetNearbyPlacesDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsNumberString()
  lat?: string;

  @IsOptional()
  @IsNumberString()
  lng?: string;

  @IsOptional()
  @IsString()
  weather?: string;

  @IsOptional()
  @IsNumberString()
  aqi?: string;
}
