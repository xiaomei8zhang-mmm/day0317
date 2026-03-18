import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { FeedingModule } from './modules/feeding/feeding.module';
import { HealthModule } from './modules/health/health.module';
import { NearbyModule } from './modules/nearby/nearby.module';
import { OutfitModule } from './modules/outfit/outfit.module';
import { RecommendModule } from './modules/recommend/recommend.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { VoiceModule } from './modules/voice/voice.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: (() => {
    const baseModules = [
      ConfigModule.forRoot({ isGlobal: true }),
      DashboardModule,
      ExpenseModule,
      FeedingModule,
      HealthModule,
      NearbyModule,
      OutfitModule,
      RecommendModule,
      ScheduleModule,
      VoiceModule,
    ];
    const dbDisabled = process.env.DISABLE_DB === 'true';
    if (dbDisabled) return baseModules;
    return [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRoot(typeOrmConfig),
      DashboardModule,
      ExpenseModule,
      FeedingModule,
      HealthModule,
      NearbyModule,
      OutfitModule,
      RecommendModule,
      ScheduleModule,
      VoiceModule,
    ];
  })(),
})
export class AppModule {}
