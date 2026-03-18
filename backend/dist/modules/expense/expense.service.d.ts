import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseSummaryDto } from './dto/get-expense-summary.dto';
import { ExpenseCategory } from '../../common/data/mock-db';
export declare class ExpenseService {
    createExpense(payload: CreateExpenseDto): {
        expenseId: number;
        monthTotal: number;
        budgetUsageRate: number;
        warning: string | null;
    };
    getSummary(query: GetExpenseSummaryDto): {
        range: "month" | "quarter" | "year";
        total: number;
        budget: number;
        usageRate: number;
        categories: {
            category: ExpenseCategory;
            ratio: number;
        }[];
    };
    getMonthTotal(): number;
    private sumByRange;
    private categoryRatios;
}
