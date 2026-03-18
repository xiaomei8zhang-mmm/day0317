"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
const common_1 = require("@nestjs/common");
const mock_db_1 = require("../../common/data/mock-db");
let ExpenseService = class ExpenseService {
    createExpense(payload) {
        if (payload.amount <= 0) {
            throw new common_1.BadRequestException('amount must be greater than 0');
        }
        const id = mock_db_1.mockDb.ids.expense++;
        const childId = payload.childId ?? mock_db_1.mockDb.child.id;
        mock_db_1.mockDb.expenses.push({
            id,
            childId,
            amount: payload.amount,
            category: payload.category,
            paidAt: payload.paidAt,
            note: payload.note,
        });
        const monthTotal = this.sumByRange('month');
        const budget = mock_db_1.mockDb.budgetByMonth;
        const usageRate = Number((monthTotal / budget).toFixed(2));
        return {
            expenseId: id,
            monthTotal,
            budgetUsageRate: usageRate,
            warning: usageRate >= 0.9 ? '预算已使用90%' : null,
        };
    }
    getSummary(query) {
        const range = query.range || 'month';
        const total = this.sumByRange(range);
        const budget = range === 'month' ? mock_db_1.mockDb.budgetByMonth : range === 'quarter' ? mock_db_1.mockDb.budgetByMonth * 3 : mock_db_1.mockDb.budgetByMonth * 12;
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
    getMonthTotal() {
        return this.sumByRange('month');
    }
    sumByRange(range) {
        const factor = range === 'month' ? 1 : range === 'quarter' ? 3 : 12;
        const items = mock_db_1.mockDb.expenses.slice(-Math.max(1, factor * 8));
        return items.reduce((sum, item) => sum + item.amount, 0);
    }
    categoryRatios(total) {
        const acc = new Map();
        for (const item of mock_db_1.mockDb.expenses) {
            acc.set(item.category, (acc.get(item.category) || 0) + item.amount);
        }
        const entries = Array.from(acc.entries()).sort((a, b) => b[1] - a[1]);
        return entries.slice(0, 5).map(([category, amount]) => ({
            category,
            ratio: total > 0 ? Number((amount / total).toFixed(2)) : 0,
        }));
    }
};
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = __decorate([
    (0, common_1.Injectable)()
], ExpenseService);
//# sourceMappingURL=expense.service.js.map