import { ScheduleEventType } from './dto/create-schedule-event.dto';
import { ScheduleService } from './schedule.service';
import { resetMockDb } from '../../common/data/mock-db';

describe('ScheduleService', () => {
  let service: ScheduleService;

  beforeEach(() => {
    resetMockDb();
    service = new ScheduleService();
  });

  it('creates event and normalizes reminder offsets', () => {
    const created = service.createEvent({
      childId: 101,
      eventType: ScheduleEventType.CHECKUP,
      title: '儿保复查',
      eventTime: '2026-03-20 10:00:00',
      remindOffsets: [1440, 0, 4320, 10080, 10080],
    });

    expect(created.eventId).toBeGreaterThan(0);
    expect(created.reminderJobs).toBe(4);
  });

  it('updates event status', () => {
    const created = service.createEvent({
      childId: 101,
      eventType: ScheduleEventType.CUSTOM,
      title: '单测事件',
      eventTime: '2026-03-21 10:00:00',
      remindOffsets: [1440],
    });
    const updated = service.updateStatus(created.eventId, { status: 'completed' });
    expect(updated.updated).toBe(true);
    expect(updated.status).toBe('completed');
  });
});
