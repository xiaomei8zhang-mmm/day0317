import { Injectable } from '@nestjs/common';
import { GetNearbyPlacesDto } from './dto/get-nearby-places.dto';
import { GetNearbySchoolsDto } from './dto/get-nearby-schools.dto';

@Injectable()
export class NearbyService {
  getPlaces(query: GetNearbyPlacesDto) {
    const city = query.city || '北京';
    const weather = query.weather || 'sunny';
    const aqi = query.aqi ? Number(query.aqi) : 45;
    const poorAir = aqi >= 120;

    const items = [
      { id: 1, name: '朝阳公园亲子区', distanceKm: 2.1, indoor: false, ageRange: '1-6岁', avgCost: 50 },
      { id: 2, name: '星童探索馆', distanceKm: 3.4, indoor: true, ageRange: '2-10岁', avgCost: 120 },
      { id: 3, name: '儿童博物馆', distanceKm: 5.0, indoor: true, ageRange: '3-12岁', avgCost: 80 },
    ];

    const sorted = [...items].sort((a, b) => {
      const scoreA = this.placeScore(a.indoor, weather, poorAir);
      const scoreB = this.placeScore(b.indoor, weather, poorAir);
      return scoreB - scoreA;
    });

    return {
      city,
      weatherMode: poorAir ? 'air_quality_indoor_first' : weather === 'rainy' ? 'rainy_indoor_first' : 'sunny_outdoor_first',
      items: sorted,
    };
  }

  getSchools(query: GetNearbySchoolsDto) {
    const stage = query.stage || 'kindergarten_3_6';
    return {
      city: query.city || '北京',
      stage,
      compliance: {
        source: '教育主管部门公开信息+地图平台公开数据',
        updatedAt: '2026-03-15',
        notice: '以当地教育主管部门最新公告为准',
      },
      items: [
        {
          id: 3001,
          name: '京华幼儿园',
          distanceKm: 2.1,
          ownership: 'public',
          tuitionRange: '1500-2200/月',
          features: ['双语', '艺术课程'],
          rating: 4.6,
        },
        {
          id: 3002,
          name: '朝阳实验小学',
          distanceKm: 2.4,
          ownership: 'public',
          tuitionRange: '公办',
          features: ['STEM', '体育'],
          rating: 4.5,
        },
      ],
    };
  }

  private placeScore(indoor: boolean, weather: string, poorAir: boolean): number {
    if (poorAir) return indoor ? 100 : 60;
    if (weather === 'rainy') return indoor ? 90 : 70;
    return indoor ? 70 : 90;
  }
}
