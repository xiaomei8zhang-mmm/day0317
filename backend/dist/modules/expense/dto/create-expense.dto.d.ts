export declare enum ExpenseCategory {
    FOOD = "food",
    DIAPER = "diaper",
    CLOTHING = "clothing",
    MEDICAL = "medical",
    EDUCATION = "education",
    TOY = "toy",
    TRAVEL = "travel",
    OTHER = "other"
}
export declare class CreateExpenseDto {
    childId?: number;
    amount: number;
    category: ExpenseCategory;
    paidAt: string;
    note?: string;
}
