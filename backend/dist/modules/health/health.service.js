"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthService = void 0;
const common_1 = require("@nestjs/common");
const mock_db_1 = require("../../common/data/mock-db");
let HealthService = class HealthService {
    createRecord(payload) {
        const id = mock_db_1.mockDb.ids.health++;
        mock_db_1.mockDb.healthRecords.push({
            id,
            childId: payload.childId ?? mock_db_1.mockDb.child.id,
            recordTime: payload.recordTime,
            weightKg: payload.weightKg,
            heightCm: payload.heightCm,
            temperatureC: payload.temperatureC,
            sleepHours: payload.sleepHours,
            note: payload.note,
        });
        return {
            recordId: id,
            warning: payload.temperatureC !== undefined && payload.temperatureC >= 38
                ? '体温偏高，建议关注并必要时就医'
                : null,
        };
    }
    getSummary(query) {
        const childId = query.childId ? Number(query.childId) : mock_db_1.mockDb.child.id;
        const items = mock_db_1.mockDb.healthRecords
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
    avgSleep(items) {
        const withSleep = items.filter((item) => item.sleepHours !== undefined).slice(-7);
        if (!withSleep.length)
            return 0;
        const total = withSleep.reduce((sum, item) => sum + (item.sleepHours ?? 0), 0);
        return Number((total / withSleep.length).toFixed(1));
    }
    buildAlerts(items) {
        const alerts = [];
        const latest = items[items.length - 1];
        if (latest?.temperatureC !== undefined && latest.temperatureC >= 38) {
            alerts.push('体温>=38.0°C，请重点观察');
        }
        const latestWeights = items
            .filter((item) => item.weightKg !== undefined)
            .slice(-3)
            .map((item) => item.weightKg);
        if (latestWeights.length === 3) {
            const max = Math.max(...latestWeights);
            const min = Math.min(...latestWeights);
            if (max - min >= 1.5) {
                alerts.push('连续3次体重波动较大，建议复查');
            }
        }
        return alerts;
    }
};
exports.HealthService = HealthService;
exports.HealthService = HealthService = __decorate([
    (0, common_1.Injectable)()
], HealthService);
//# sourceMappingURL=health.service.js.map