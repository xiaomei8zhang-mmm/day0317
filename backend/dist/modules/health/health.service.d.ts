import { GetHealthSummaryDto } from './dto/get-health-summary.dto';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
export declare class HealthService {
    createRecord(payload: CreateHealthRecordDto): {
        recordId: number;
        warning: string | null;
    };
    getSummary(query: GetHealthSummaryDto): {
        childId: number;
        latest: {
            weightKg: number;
            heightCm: number;
            sleepHoursAvg7d: number;
        };
        trend: {
            date: string;
            weightKg: number;
            heightCm: number;
        }[];
        alerts: string[];
    };
    private avgSleep;
    private buildAlerts;
}
