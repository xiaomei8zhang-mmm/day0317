import { ExpenseService } from '../expense/expense.service';
import { ScheduleService } from '../schedule/schedule.service';
import { VoiceService } from './voice.service';
import { resetMockDb } from '../../common/data/mock-db';

describe('VoiceService', () => {
  let service: VoiceService;

  beforeEach(() => {
    resetMockDb();
    service = new VoiceService(new ExpenseService(), new ScheduleService());
  });

  it('parses expense query intent', () => {
    const parsed = service.parse({
      sessionId: 's1',
      text: '这个月到目前花了多少钱',
    });
    expect(parsed.intent).toBe('query_expense_total');
    expect(parsed.needConfirm).toBe(false);
  });

  it('executes expense creation intent', () => {
    const parsed = service.parse({
      sessionId: 's2',
      text: '记一笔尿不湿89元',
    });
    expect(parsed.intent).toBe('create_expense');
    expect(parsed.needConfirm).toBe(true);

    const executed = service.execute({
      sessionId: 's2',
      intent: parsed.intent,
      slots: parsed.slots,
    });
    expect(executed.action.type).toBe('refresh');
    expect(executed.text).toContain('已为你记录一笔');
  });
});
