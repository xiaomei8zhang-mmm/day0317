import { HealthService } from './health.service';
import { resetMockDb } from '../../common/data/mock-db';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(() => {
    resetMockDb();
    service = new HealthService();
  });

  it('creates health record and warns on high temperature', () => {
    const created = service.createRecord({
      childId: 101,
      recordTime: '2026-03-17 08:00:00',
      temperatureC: 38.2,
      weightKg: 13.5,
      heightCm: 90.3,
    });
    expect(created.recordId).toBeGreaterThan(0);
    expect(created.warning).toContain('体温偏高');
  });

  it('includes alerts in summary after fever record', () => {
    service.createRecord({
      childId: 101,
      recordTime: '2026-03-17 08:10:00',
      temperatureC: 38.1,
    });
    const summary = service.getSummary({ childId: '101' });
    expect(summary.alerts.some((item) => item.includes('38.0'))).toBe(true);
  });
});
