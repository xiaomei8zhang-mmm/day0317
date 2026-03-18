import { Injectable } from '@nestjs/common';
import { GetHealthSummaryDto } from './dto/get-health-summary.dto';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { mockDb } from '../../common/data/mock-db';

@Injectable()
export class HealthService {
  createRecord(payload: CreateHealthRecordDto) {
    const id = mockDb.ids.health++;
    mockDb.healthRecords.push({
      id,
      childId: payload.childId ?? mockDb.child.id,
      recordTime: payload.recordTime,
      weightKg: payload.weightKg,
      heightCm: payload.heightCm,
      temperatureC: payload.temperatureC,
      sleepHours: payload.sleepHours,
      note: payload.note,
    });

    return {
      recordId: id,
      warning:
        payload.temperatureC !== undefined && payload.temperatureC >= 38
          ? '体温偏高，建议关注并必要时就医'
          : null,
    };
  }

  getSummary(query: GetHealthSummaryDto) {
    const childId = query.childId ? Number(query.childId) : mockDb.child.id;
    const items = mockDb.healthRecords
      .filter((item) => item.childId === childId)
      .sort((a, b) => new Date(a.recordTime).getTime() - new Date(b.recordTime).getTime());
    const latestRecord = items[items.length - 1];
    const latest = {
      weightKg: latestRecord?.weightKg ?? 0,
      heightCm: latestRecord?.heightCm ?? 0,
      sleepHoursAvg7d: this.avgSleep(items),
    };
    const trend = items.slice(-8).map((item) => ({
      date: item.recordTime.slice(0, 10),
      weightKg: item.weightKg ?? latest.weightKg,
      heightCm: item.heightCm ?? latest.heightCm,
    }));
    const alerts = this.buildAlerts(items);

    return {
      childId,
      latest,
      trend,
      alerts,
    };
  }

  private avgSleep(items: Array<{ sleepHours?: number }>): number {
    const withSleep = items.filter((item) => item.sleepHours !== undefined).slice(-7);
    if (!withSleep.length) return 0;
    const total = withSleep.reduce((sum, item) => sum + (item.sleepHours ?? 0), 0);
    return Number((total / withSleep.length).toFixed(1));
  }

  private buildAlerts(
    items: Array<{ temperatureC?: number; weightKg?: number }>,
  ): string[] {
    const alerts: string[] = [];
    const latest = items[items.length - 1];
    if (latest?.temperatureC !== undefined && latest.temperatureC >= 38) {
      alerts.push('体温>=38.0°C，请重点观察');
    }

    const latestWeights = items
      .filter((item) => item.weightKg !== undefined)
      .slice(-3)
      .map((item) => item.weightKg as number);
    if (latestWeights.length === 3) {
      const max = Math.max(...latestWeights);
      const min = Math.min(...latestWeights);
      if (max - min >= 1.5) {
        alerts.push('连续3次体重波动较大，建议复查');
      }
    }
    return alerts;
  }
}
