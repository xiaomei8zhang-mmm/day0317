import { Injectable } from '@nestjs/common';
import { GetRecommendQueryDto } from './dto/get-recommend-query.dto';
import { NearbyService } from '../nearby/nearby.service';

@Injectable()
export class RecommendService {
  constructor(private readonly nearbyService: NearbyService) {}

  getPlaces(query: GetRecommendQueryDto) {
    return this.nearbyService.getPlaces({
      city: query.city,
      weather: query.weather,
      aqi: query.aqi,
    });
  }

  getSchools(query: GetRecommendQueryDto) {
    return this.nearbyService.getSchools({
      city: query.city,
      stage: query.stage,
      budget: query.budget,
    });
  }
}
