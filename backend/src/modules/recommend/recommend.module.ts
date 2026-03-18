import { Module } from '@nestjs/common';
import { RecommendController } from './recommend.controller';
import { RecommendService } from './recommend.service';
import { NearbyModule } from '../nearby/nearby.module';

@Module({
  imports: [NearbyModule],
  controllers: [RecommendController],
  providers: [RecommendService],
})
export class RecommendModule {}
