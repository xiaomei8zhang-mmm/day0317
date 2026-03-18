import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseSummaryDto } from './dto/get-expense-summary.dto';
import { mockDb, ExpenseCategory } from '../../common/data/mock-db';

@Injectable()
export class ExpenseService {
  createExpense(payload: CreateExpenseDto) {
    if (payload.amount <= 0) {
      throw new BadRequestException('amount must be greater than 0');
    }

    const id = mockDb.ids.expense++;
    const childId = payload.childId ?? mockDb.child.id;
    mockDb.expenses.push({
      id,
      childId,
      amount: payload.amount,
      category: payload.category,
      paidAt: payload.paidAt,
      note: payload.note,
    });

    const monthTotal = this.sumByRange('month');
    const budget = mockDb.budgetByMonth;
    const usageRate = Number((monthTotal / budget).toFixed(2));

    return {
      expenseId: id,
      monthTotal,
      budgetUsageRate: usageRate,
      warning: usageRate >= 0.9 ? '预算已使用90%' : null,
    };
  }

  getSummary(query: GetExpenseSummaryDto) {
    const range = query.range || 'month';
    const total = this.sumByRange(range);
    const budget = range === 'month' ? mockDb.budgetByMonth : range === 'quarter' ? mockDb.budgetByMonth * 3 : mockDb.budgetByMonth * 12;
    const usageRate = Number((total / budget).toFixed(2));
    const categories = this.categoryRatios(total);

    return {
      range,
      total,
      budget,
      usageRate,
      categories,
    };
  }

  getMonthTotal(): number {
    return this.sumByRange('month');
  }

  private sumByRange(range: 'month' | 'quarter' | 'year'): number {
    const factor = range === 'month' ? 1 : range === 'quarter' ? 3 : 12;
    const items = mockDb.expenses.slice(-Math.max(1, factor * 8));
    return items.reduce((sum, item) => sum + item.amount, 0);
  }

  private categoryRatios(total: number): Array<{ category: ExpenseCategory; ratio: number }> {
    const acc = new Map<ExpenseCategory, number>();
    for (const item of mockDb.expenses) {
      acc.set(item.category, (acc.get(item.category) || 0) + item.amount);
    }

    const entries = Array.from(acc.entries()).sort((a, b) => b[1] - a[1]);
    return entries.slice(0, 5).map(([category, amount]) => ({
      category,
      ratio: total > 0 ? Number((amount / total).toFixed(2)) : 0,
    }));
  }
}
