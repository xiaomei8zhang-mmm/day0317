import { ExpenseCategory } from './dto/create-expense.dto';
import { ExpenseService } from './expense.service';
import { resetMockDb } from '../../common/data/mock-db';

describe('ExpenseService', () => {
  let service: ExpenseService;

  beforeEach(() => {
    resetMockDb();
    service = new ExpenseService();
  });

  it('creates expense and updates month summary', () => {
    const before = service.getSummary({ range: 'month' }).total;
    const created = service.createExpense({
      childId: 101,
      amount: 100,
      category: ExpenseCategory.DIAPER,
      paidAt: '2026-03-17 09:00:00',
      note: '单测新增',
    });
    const after = service.getSummary({ range: 'month' }).total;

    expect(created.expenseId).toBeGreaterThan(0);
    expect(after).toBe(before + 100);
  });

  it('returns warning when budget usage reaches threshold', () => {
    const created = service.createExpense({
      childId: 101,
      amount: 2000,
      category: ExpenseCategory.OTHER,
      paidAt: '2026-03-17 09:10:00',
    });
    expect(created.warning).toBe('预算已使用90%');
  });

  it('rejects non-positive amount', () => {
    expect(() =>
      service.createExpense({
        childId: 101,
        amount: 0,
        category: ExpenseCategory.OTHER,
        paidAt: '2026-03-17 09:10:00',
      }),
    ).toThrow('amount must be greater than 0');
  });
});
