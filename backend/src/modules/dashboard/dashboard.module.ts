import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { ExpenseModule } from '../expense/expense.module';
import { FeedingModule } from '../feeding/feeding.module';
import { NearbyModule } from '../nearby/nearby.module';
import { OutfitModule } from '../outfit/outfit.module';
import { ScheduleModule } from '../schedule/schedule.module';

@Module({
  imports: [ExpenseModule, FeedingModule, NearbyModule, OutfitModule, ScheduleModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
