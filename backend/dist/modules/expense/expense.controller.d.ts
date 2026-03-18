import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseSummaryDto } from './dto/get-expense-summary.dto';
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    create(payload: CreateExpenseDto): {
        expenseId: number;
        monthTotal: number;
        budgetUsageRate: number;
        warning: string | null;
    };
    summary(query: GetExpenseSummaryDto): {
        range: "month" | "quarter" | "year";
        total: number;
        budget: number;
        usageRate: number;
        categories: {
            category: import("../../common/data/mock-db").ExpenseCategory;
            ratio: number;
        }[];
    };
}
