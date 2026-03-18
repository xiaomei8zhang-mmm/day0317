import { Module } from '@nestjs/common';
import { VoiceController } from './voice.controller';
import { VoiceService } from './voice.service';
import { ExpenseModule } from '../expense/expense.module';
import { ScheduleModule } from '../schedule/schedule.module';

@Module({
  imports: [ExpenseModule, ScheduleModule],
  controllers: [VoiceController],
  providers: [VoiceService],
})
export class VoiceModule {}
